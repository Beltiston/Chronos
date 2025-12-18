import { auth } from "@/auth";
import { Method, RouteConfig } from "@/types/route";
import { customError } from "@/utils/errors";

const login: RouteConfig = {
  method: Method.POST,
  endpoint: "/auth/login",
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    limit: 5,
  },
  private: false,
  handler: async (c) => {
    const { email, password } = await c.req.json();
    try {
      const session = await auth.api.signInEmail({
        body: {
          email,
          password,
        },
      });

      if (session) {
        c.header(
          "Set-Cookie",
          `session=${session.token}; HttpOnly; Path=/; SameSite=None; Secure`
        );

        return c.json({ success: true, code: 200, data: session }, 200);
      }
      return customError(c, "AUTH_INVALID_CREDENTIALS");
    } catch (error) {
      console.log(error);
      return c.json({ success: false, code: 500, error }, 500);
    }
  },
};

export default login;
