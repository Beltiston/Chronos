import { auth } from "../../auth.js";
import { Method, RouteConfig } from "../../types/route.js";
import { customError } from "../../utils/submit.js";

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
  openapi: {
    summary: "Login to your account",
    description: "Login to your account",
    tags: ["auth"],
    responses: {
      200: {
        description: "Login successful",
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
                            token: { type: "string", example: "session-token" },
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

export default login;
