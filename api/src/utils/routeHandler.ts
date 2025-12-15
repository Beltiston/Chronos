import { Hono, MiddlewareHandler } from "hono";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";
import fs from "fs";
import { Method, RouteConfig } from "@/types/route";
import { logger } from "./logger.js";
import { requireUser } from "../middleware/requireUser.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV !== "production";
const exts = isDev ? [".ts"] : [".js"];

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

        (app as any)[httpMethod](route.endpoint, ...middlewares, route.handler);

        // Force flush the log immediately
        logger.info(
          `[Route] Registered ${Method[route.method]} ${route.endpoint}`
        );
      }
    } catch (err) {
      logger.error(`Failed to load route file: ${file}`);
    }
  }
}
