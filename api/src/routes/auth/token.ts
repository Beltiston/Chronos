import { Method, RouteConfig } from "@/types/route";
import { customError } from "@/utils/errors";
import { generateApiToken } from "@/utils/jwt";
import db from "@/db";

const generateToken: RouteConfig = {
  method: Method.POST,
  endpoint: "/auth/token",
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    limit: 10,
  },
  private: true,
  handler: async (c) => {
    const session = c.get("session");
    const authUser = c.get("user");

    // Ensure user is authenticated via better-auth
    if (!session || !authUser) {
      return customError(c, "USER_NOT_FOUND");
    }

    // Get the user from our users table using auth_id
    const user = await db.utils.getUserByAuthId(authUser.id);

    if (!user) {
      return customError(c, "USER_NOT_FOUND");
    }

    // Generate JWT token for API access
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
};

export default generateToken;
