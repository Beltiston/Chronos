import { Context, Next } from "hono";

export function requireUser(options?: { roles?: string[] }) {
  return async (c: Context, next: Next) => {
    const user = c.get("user"); 
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    if (options?.roles && !options.roles.includes(user.role)) {
      return c.json({ error: "Forbidden" }, 403);
    }

    return next();
  };
}
