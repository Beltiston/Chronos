import { z } from "zod";
import { Method, RouteConfig } from "@/types/route";
import { customError } from "@/utils/submit";
import { logger } from "@/utils/logger";
import db from "@/db";
import { ALLOWED_OAUTH_PROVIDERS } from "@/types/oauthProvider";

const createOAuthInstanceSchema = z.object({
  provider: z.enum(ALLOWED_OAUTH_PROVIDERS),
  clientId: z.string().min(1),
  clientSecret: z.string().min(1),
  redirectUri: z.string().url().optional().nullable(),
});

const createOAuthInstance: RouteConfig = {
  method: Method.POST,
  endpoint: "/oauth/instances",
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    limit: 10,
  },
  private: true,
  handler: async (c) => {
    const user = c.get("user");

    if (!user?.id) {
      return customError(c, "USER_NOT_FOUND");
    }

    const body = await c.req.json().catch(() => ({}));
    const parsed = createOAuthInstanceSchema.safeParse(body);

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

    const { provider, clientId, clientSecret, redirectUri } = parsed.data;

    // Check if instance already exists
    const existing = await db.utils.getOAuthInstanceByProvider(
      user.id,
      provider
    );

    if (existing) {
      return customError(c, "OAUTH_INSTANCE_ALREADY_EXISTS");
    }

    try {
      const instance = await db.utils.createOAuthInstance({
        userId: user.id,
        provider,
        clientId,
        clientSecret,
        redirectUri,
      });

      // Don't return the client secret in the response
      const { client_secret, ...safeInstance } = instance;

      return c.json(
        {
          success: true,
          code: 201,
          data: safeInstance,
        },
        201
      );
    } catch (error: any) {
      logger.error(error);
      return customError(c, "INTERNAL_SERVER_ERROR");
    }
  },
  openapi: {
    summary: "Create OAuth Instance",
    description:
      "Create a new OAuth instance. \n\n" +
      "**RATELIMIT:** `10` requests per `15` minutes.",
    tags: ["auth"],
    responses: {
      201: {
        description: "OAuth instance created",
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
                        id: { type: "string", example: "instance-id" },
                        provider: { type: "string", example: "google" },
                        clientId: { type: "string", example: "client-id" },
                        redirectUri: {
                          type: "string",
                          example: "redirect-uri",
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
      400: {
        description: "Validation error",
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
                        id: { type: "string", example: "INPUT_ERROR" },
                        status: { type: "number", example: 429 },
                        message: {
                          type: "string",
                          example: "Invalid input",
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
      404: {
        description: "User not found",
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
                        id: { type: "string", example: "USER_NOT_FOUND" },
                        status: { type: "number", example: 404 },
                        message: {
                          type: "string",
                          example: "The requested user does not exist",
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

export default createOAuthInstance;
