import db from "@/db";
import { Method, RouteConfig } from "@/types/route";

const getUser: RouteConfig = {
  endpoint: "/user/get",
  method: Method.GET,
  private: true,
  roles: ["user", "admin"],
  handler: async (c) => {
    const rawUser = (c.req as typeof c.req & { user: { id: string } }).user;
    const userId = rawUser.id;
    const user = await db.client
      .selectFrom("users")
      .selectAll()
      .where("id", "=", userId)
      .executeTakeFirst();
    return c.json({ user });
  },
};
export default [getUser];