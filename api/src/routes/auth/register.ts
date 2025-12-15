import { z } from "zod";
import { Method, RouteConfig } from "@/types/route";
import { auth } from "@/auth";
import { customError } from "@/utils/errors";
import { EMAIL_REGEX } from "@/utils/regex";
import { logger } from "@/utils/logger";
import { env } from "@/utils/env";
import db from "@/db";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().regex(EMAIL_REGEX, "Invalid email format"),
  password: z.string().min(8),
});

const register: RouteConfig = {
  method: Method.POST,
  endpoint: "/api/register",
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    limit: 5,
  },
  private: false,
  handler: async (c) => {
    const body = await c.req.json().catch(() => ({}));
    const parsed = registerSchema.safeParse(body);

    if (env.DISABLE_REGISTRATION) {
      return customError(c, "AUTH_REGISTRATION_DISABLED");
    }

    if (!parsed.success) {
      return c.json(
        {
          success: false,
          code: 400,
          error: {
            id: "VALIDATION_ERROR",
            message: "Invalid input",
            details: parsed.error.flatten().fieldErrors,
          },
        },
        400
      );
    }

    const { name, email, password } = parsed.data;

    if (await db.utils.checkUsernameExists(name)) {
      return customError(c, "AUTH_USERNAME_ALREADY_EXISTS");
    }

    try {
      const authUser = await auth.api.signUpEmail({
        body: {
          name,
          email,
          password,
        },
      });

      const user = await db.utils.createUser({
        username: name,
        auth_id: authUser.user.id,
      });

      return c.json(
        {
          success: true,
          code: 201,
          data: authUser,
        },
        201
      );
    } catch (error: any) {
      if (
        error?.body?.message?.includes("already exists") ||
        error?.status === 422
      ) {
        return customError(c, "AUTH_EMAIL_ALREADY_EXISTS");
      }

      logger.error(error.body);
      return customError(c, "INTERNAL_SERVER_ERROR");
    }
  },
};

export default register;
