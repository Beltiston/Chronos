import { rateLimiter } from "hono-rate-limiter";
import { Context, Env } from "hono";

import { HonoEnv } from "@/types";
import { customError } from "../utils/errors";

/**
 * Creates a rate limiting middleware.
 *
 * @param options - Configuration options for the rate limiter.
 * @returns The rate limiting middleware.
 */
export const createRateLimiter = (options?: {
  windowMs?: number;
  limit?: number;
  message?: string;
  keyGenerator?: (c: Context<HonoEnv>) => string;
}) => {
  const windowMs = options?.windowMs ?? 60 * 1000; // 1 minute default
  const limit = options?.limit ?? 100; // 100 requests per minute default
  const message =
    options?.message ?? "Too many requests, please try again later.";

  return rateLimiter<HonoEnv>({
    windowMs,
    limit,
    message,
    handler: (c) => {
      // Return structured JSON error
      return customError(c, "RATE_LIMIT_EXCEEDED");
    },
    keyGenerator:
      options?.keyGenerator ??
      ((c: Context<HonoEnv>) => {
        const user = c.get("user");
        if (user?.id) {
          return user.id;
        }
        // Fallback to IP if user is not authenticated (though this middleware is intended for private routes)
        const ip =
          c.req.header("cf-connecting-ip") ||
          c.req.header("x-forwarded-for") ||
          "unknown";
        return typeof ip === "string" ? ip : ip[0];
      }),
  });
};
