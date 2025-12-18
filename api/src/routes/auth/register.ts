import { z } from "zod";
import { Method, RouteConfig } from "@/types/route";
import { auth } from "@/auth";
import { customError } from "@/utils/submit";
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
  endpoint: "/auth/register",
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
  openapi: {
    deprecated: false,
    tags: ["auth"],
    externalDocs: {
      description: "Open source-code",
      url: "https://github.com/Beltiston/Chronos/blob/main/api/src/routes/auth/register.ts",
    },
    summary: "Register a new user",
    description:
      "Register a new user. \n\n" +
      "**RATELIMIT:** `5` requests per `15` minutes.",
    responses: {
      201: {
        description: "User registered",
        content: {
          "application/json": {
            schema: {
              allOf: [
                {
                  $ref: "#/components/schemas/SuccessResponse",
                },
                {
                  type: "object",
                  properties: {
                    data: {
                      type: "object",
                      properties: {
                        user: {
                          type: "object",
                          properties: {
                            id: { type: "string", example: "user-id" },
                            username: { type: "string", example: "username" },
                            role: { type: "string", example: "user" },
                          },
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      },
      429: {
        description: "Too many requests",
        content: {
          "application/json": {
            schema: {
              allOf: [
                {
                  $ref: "#/components/schemas/ErrorResponse",
                },
                {
                  type: "object",
                  properties: {
                    error: {
                      type: "object",
                      properties: {
                        id: { type: "string", example: "TOO_MANY_REQUESTS" },
                        status: { type: "number", example: 429 },
                        message: {
                          type: "string",
                          example: "Too many requests, please try again later",
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
  },
};

export default register;
