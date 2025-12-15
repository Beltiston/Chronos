import { Method, RouteConfig } from "@/types/route";

const getSession: RouteConfig = {
  method: Method.GET,
  endpoint: "/session",
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
};

export default getSession;
