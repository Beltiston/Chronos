import { Context, Next } from "hono";
import { auth } from "../auth.js";
import { verifyApiToken } from "../utils/jwt.js";
import db from "../db/index.js";

export async function sessionMiddleware(c: Context, next: Next) {
  // First, try to get JWT token from Authorization header
  const authHeader = c.req.header("Authorization");

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.substring(7); // Remove "Bearer " prefix
    const payload = verifyApiToken(token);

    if (payload) {
      // Load user from users table using userId from JWT
      const user = await db.utils.getUserById(payload.userId);

      if (user) {
        c.set("user", {
          id: user.id,
          name: user.username,
          role: user.role,
        });
        c.set("session", { token: "jwt" }); // Indicate JWT auth
        await next();
        return;
      }
    }
  }

  // Fallback to better-auth session (for web app)
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    await next();
    return;
  }

  c.set("user", session.user);
  c.set("session", session.session);
  await next();
}
