import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";

import { auth } from "./auth";
import { HonoEnv } from "./types";
import { logger } from "./utils/logger";
import { registerRoutes } from "./utils/routeHandler";
import { sessionMiddleware } from "./middleware/session";

const app = new Hono<HonoEnv>();

app.use("*", sessionMiddleware);

// CORS
app.use("/v1/*", cors({ origin: "*" }));
app.use("/auth/*", async (c, next) => {
  const origin = c.req.header("Origin") || "";

  if (origin === "http://localhost:4480") {
    c.header("Access-Control-Allow-Origin", origin);
  }

  c.header("Access-Control-Allow-Credentials", "true");
  c.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (c.req.method === "OPTIONS") {
    return c.text("OK", 200);
  }

  return next();
});

// Auth
app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

// Static
app.use(
  "/assets/*",
  serveStatic({
    root: "./public",
    rewriteRequestPath: (path) => path.replace(/^\/assets/, ""),
  })
);

await bootstrap();

export default app;

async function bootstrap() {
  try {
    logger.debug("Bootstrapping app...");

    await registerRoutes(app);

    app.notFound((c) =>
      c.json(
        {
          success: false,
          code: 404,
          error: { id: "NOT_FOUND", status: 404, message: "Webpage not found" },
        },
        404
      )
    );
    app.onError((err, c) => {
      console.error(err);
      return c.json(
        {
          success: false,
          code: 500,
          error: {
            id: "INTERNAL_SERVER_ERROR",
            status: 500,
            message: "internal server error",
          },
        },
        500
      );
    });
  } catch (err) {
    console.error("Failed to bootstrap app:", err);
    process.exit(1);
  }
}
