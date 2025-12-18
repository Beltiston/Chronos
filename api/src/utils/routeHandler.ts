import { Hono, MiddlewareHandler } from "hono";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";
import fs from "fs";
import { describeRoute } from "hono-openapi";

import { Method, RouteConfig, RouteVersion } from "../types/route.js";
import { logger } from "./logger.js";
import { requireUser } from "../middleware/requireUser.js";
import { createRateLimiter } from "../middleware/rateLimit.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isTS = __filename.endsWith(".ts");
const exts = isTS ? [".ts"] : [".js"];

export async function registerRoutes(
  app: Hono<any>,
  routesDir = path.join(__dirname, "../routes")
) {
  const walk = (dir: string): string[] => {
    let files: string[] = [];

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        files = files.concat(walk(fullPath)); // recurse subdirs
      } else if (
        exts.some((e) => fullPath.endsWith(e)) &&
        !fullPath.endsWith(".d.ts") &&
        !path.basename(fullPath).startsWith("_")
      ) {
        files.push(fullPath);
      }
    }

    return files;
  };

  logger.debug(`Scanning routes in: ${routesDir}`);
  const routeFiles = walk(routesDir);
  logger.debug(`Found route files: ${routeFiles.join(", ")}`);

  for (const file of routeFiles) {
    try {
      const mod = await import(pathToFileURL(file).href);
      const routes: RouteConfig[] = [];

      if (Array.isArray(mod.default)) {
        routes.push(...mod.default);
      } else if ("default" in mod && typeof mod.default === "object") {
        routes.push(mod.default);
      } else {
        for (const key in mod) {
          const item = mod[key];
          if (item && typeof item === "object" && "endpoint" in item) {
            routes.push(item);
          }
        }
      }

      if (routes.length === 0) {
        logger.warn(`No routes found in file: ${file}`);
        continue;
      }

      for (const route of routes) {
        const middlewares: MiddlewareHandler[] = [];

        if (route.private) {
          middlewares.push(requireUser({ roles: route.roles }));
        }

        if (route.rateLimit) {
          middlewares.push(
            createRateLimiter(
              route.rateLimit ?? {
                windowMs: 15 * 60 * 1000, // 15 minutes
                limit: 100, // Limit each user to 100 requests per windowMs
              }
            )
          );
        }

        const methodName = Object.keys(Method).find(
          (key) => Method[key as keyof typeof Method] === route.method
        );
        if (!methodName)
          throw new Error(`Invalid route method: ${route.method}`);
        const httpMethod = methodName.toLowerCase() as
          | "get"
          | "post"
          | "put"
          | "delete";

        const version = route.version ?? RouteVersion.STABLE;
        const prefixes: string[] = [];

        if (route.standalone) {
          prefixes.push("");
        } else if (version === RouteVersion.STABLE) {
          prefixes.push("/v1", "/v2", "/v3");
        } else if (version === RouteVersion.BETA) {
          prefixes.push("/v2", "/v3");
        } else if (version === RouteVersion.ALPHA) {
          prefixes.push("/v3");
        }

        // 1. Register the plain endpoint with OpenAPI middleware if it's not a standalone route
        // This ensures the endpoint appears once in the OpenAPI spec without version prefixes.
        // If it is standalone, it's already registered once with everything below.
        if (!route.standalone) {
          const plainEndpoint = route.endpoint.startsWith("/")
            ? route.endpoint
            : `/${route.endpoint}`;

          const openapiMiddlewares = [...middlewares];
          if (route.openapi) {
            openapiMiddlewares.push(describeRoute(route.openapi));
          }

          (app as any)[httpMethod](
            plainEndpoint,
            ...openapiMiddlewares,
            route.handler
          );
          logger.info(
            `[Route] Registered ${
              Method[route.method]
            } ${plainEndpoint} (openapi)`
          );
        }

        // 2. Register all versioned routes (or standalone) without describeRoute
        for (const prefix of prefixes) {
          const fullEndpoint = `${prefix}${
            route.endpoint.startsWith("/") ? "" : "/"
          }${route.endpoint}`;

          // Add describeRoute only for standalone routes (since they won't have a "plain" registration)
          const versionedMiddlewares = [...middlewares];
          if (route.standalone && route.openapi) {
            versionedMiddlewares.push(describeRoute(route.openapi));
          }

          (app as any)[httpMethod](
            fullEndpoint,
            ...versionedMiddlewares,
            route.handler
          );
          logger.info(
            `[Route] Registered ${
              Method[route.method]
            } ${fullEndpoint} (${version})`
          );
        }
      }
    } catch (err) {
      logger.error(`Failed to load route file: ${file}`);
    }
  }
}
