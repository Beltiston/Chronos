import { z } from "zod";
import { Method, RouteConfig } from "@/types/route";
import { customError } from "@/utils/errors";
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
  endpoint: "/api/oauth/instances",
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
};

export default createOAuthInstance;
