import { Method, RouteConfig, RouteVersion } from "../../types/route.js";

const getSession: RouteConfig = {
  method: Method.GET,
  endpoint: "/auth/session",
  version: RouteVersion.ALPHA,
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each user to 100 requests per windowMs
  },
  private: false,
  handler: async (c) => {
    const session = c.get("session");
    const user = c.get("user");

    return c.json({ session, user });
  },
  openapi: {
    deprecated: true,
    externalDocs: {
      description: "Open source-code",
      url: "https://github.com/Beltiston/Chronos/blob/main/api/src/routes/auth/session.ts",
    },
    summary: "Get session",
    description:
      "Get your session data. \n\n" +
      "**RATELIMIT:** `100` requests per `15` minutes.",
    tags: ["auth"],
    servers: [
      {
        url: "/v3",
        description: "Alpha server",
      },
    ],
    responses: {
      200: {
        description: "Session data",
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
                        session: {
                          type: "object",
                          properties: {
                            id: { type: "string", example: "session-id" },
                            userId: { type: "string", example: "user-id" },
                            expiresAt: {
                              type: "string",
                              format: "date-time",
                              example: "2025-12-18T22:18:10.000Z",
                            },
                          },
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

export default getSession;
