import { describe, it, expect } from "vitest";
import { Hono } from "hono";
import { createRateLimiter } from "../middleware/rateLimit.js";

describe("Rate Limit Middleware", () => {
  it("should block requests after limit is reached", async () => {
    const app = new Hono<any>();
    const limit = 2;
    // Mock user for keyGenerator
    app.use("*", async (c, next) => {
      c.set("user", { id: "test-user" });
      await next();
    });

    app.use(
      "*",
      createRateLimiter({
        windowMs: 1000,
        limit: limit,
      })
    );

    app.get("/", (c) => c.text("Hello"));

    const res1 = await app.request("/");
    expect(res1.status).toBe(200);

    const res2 = await app.request("/");
    expect(res2.status).toBe(200);

    // should be blocked
    const res3 = await app.request("/");
    expect(res3.status).toBe(429);
    const json = await res3.json();
    expect(json).toEqual({
      success: false,
      code: 429,
      error: {
        id: "RATE_LIMIT_EXCEEDED",
        message: "Too many requests, please try again later.",
      },
    });
  });
});
