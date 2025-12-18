import { customError } from "@/utils/submit";
import { Context, Next } from "hono";

export function requireUser(options?: { roles?: string[] }) {
  return async (c: Context, next: Next) => {
    const user = c.get("user");
    const session = c.get("session");

    if (!user || !session) return customError(c, "UNAUTHORIZED");

    if (options?.roles && !options.roles.includes(user.role)) {
      return customError(c, "FORBIDDEN");
    }

    return next();
  };
}
