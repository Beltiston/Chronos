import { logger } from "./utils/logger";

import { Hono } from "hono";
import { cors } from "hono/cors";
import { registerRoutes } from "./utils/routeHandler";
import { auth } from "./auth";
import { sessionMiddleware } from "./middleware/session";

import { env } from "./utils/env";
import { HonoEnv } from "./types";

const app = new Hono<HonoEnv>();

app.use("*", sessionMiddleware);

// CORS
app.use("/v1/*", cors({ origin: "*" }));

// Auth

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

await bootstrap();

export default app;

async function bootstrap() {
  try {
    logger.debug("Bootstrapping app...");

    await registerRoutes(app);

    app.notFound((c) => c.json({ status: 404, message: "not found" }, 404));
    app.onError((err, c) => {
      console.error(err);
      return c.text("Internal Server Error", 500);
    });
  } catch (err) {
    console.error("Failed to bootstrap app:", err);
    process.exit(1);
  }
}
