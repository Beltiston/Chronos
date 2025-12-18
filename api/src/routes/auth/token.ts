import { Method, RouteConfig, RouteVersion } from "../../types/route.js";
import { customError } from "../../utils/submit.js";
import { generateApiToken } from "../../utils/jwt.js";
import db from "../../db/index.js";

const generateToken: RouteConfig = {
  endpoint: "/auth/token",
  method: Method.POST,
  version: RouteVersion.STABLE,
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    limit: 10,
  },
  private: true,
  handler: async (c) => {
    const session = c.get("session");
    const authUser = c.get("user");

    if (!session || !authUser) {
      return customError(c, "USER_NOT_FOUND");
    }

    const user = await db.utils.getUserByAuthId(authUser.id);

    if (!user) {
      return customError(c, "USER_NOT_FOUND");
    }

    const token = generateApiToken(user.id, user.username, user.role);

    return c.json(
      {
        success: true,
        code: 200,
        data: {
          token,
          expiresIn: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
          user: {
            id: user.id,
            username: user.username,
            role: user.role,
          },
        },
      },
      200
    );
  },
  openapi: {
    summary: "Generate API Token",
    description:
      "Generate an API token for authentication. \nThis token can be used to authenticate requests to the API.\n\n**RATELIMIT:** `10` requests per `15` minutes.\n\n**Note:** The token will expire in `30 days`.",
    responses: {
      200: {
        description: "API token generated successfully",
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
                        token: { type: "string", example: "your-api-token" },
                        expiresIn: {
                          type: "number",
                          example: 30 * 24 * 60 * 60 * 1000,
                        },
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
      401: {
        description: "Unauthorized",
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
                        id: { type: "string", example: "UNAUTHORIZED" },
                        status: { type: "number", example: 401 },
                        message: {
                          type: "string",
                          example: "Unauthorized (not logged-in)",
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
      403: {
        description: "Forbidden",
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
                        id: { type: "string", example: "FORBIDDEN" },
                        status: { type: "number", example: 403 },
                        message: {
                          type: "string",
                          example:
                            "Your account does not have access to this resource.",
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
                          example: "User not found",
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
    deprecated: false,
    tags: ["auth"],
    externalDocs: {
      description: "Open source-code",
      url: "https://github.com/Beltiston/Chronos/blob/main/api/src/routes/auth/token.ts",
    },
  },
};

export default generateToken;
