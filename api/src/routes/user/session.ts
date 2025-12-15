import { Method, RouteConfig } from "@/types/route";

const getSession: RouteConfig = {
  method: Method.GET,
  endpoint: "/session",
  private: true,
  handler: async (c) => {
    const session = c.get("session");
    const user = c.get("user");

    return c.json({ session, user });
  },
};

export default getSession;
