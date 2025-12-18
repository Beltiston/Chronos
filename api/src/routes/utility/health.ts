import { Method, RouteConfig, RouteVersion } from "@/types/route";
import { customSuccess } from "@/utils/submit";

const health: RouteConfig = {
  endpoint: "health",
  method: Method.GET,
  version: RouteVersion.STABLE,
  private: false,
  rateLimit: {
    limit: 60, // 60 requests per minute
    windowMs: 60 * 1000, // 1 minute
  },
  openapi: {
    summary: "Health",
    description: "Returns the health status of the API and a timestamp.",
    responses: {
      200: {
        description: "API is healthy",
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
                        status: { type: "string", example: "ok" },
                        timestamp: { type: "number", example: 1734549317000 },
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
    tags: ["Utility"],
  },
  handler: async (c) => {
    return customSuccess(c, { status: "ok", timestamp: Date.now() }, 200);
  },
};

export default health;
