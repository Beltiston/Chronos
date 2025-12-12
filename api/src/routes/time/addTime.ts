import db from "@/db";
import { Method, RouteConfig } from "@/types/route";
import { nanoid } from "nanoid";

const addTime: RouteConfig = {
  endpoint: "/times/add",
  method: Method.POST,
  private: true,
  roles: ["user", "admin"],
  handler: async (c) => {
    const body = await c.req.json();
    const user = (c.req as typeof c.req & { user: { id: string } }).user;
    await db.client.insertInto("heartbeats").values({
      heartbeat_id: nanoid(),
      user_id: user.id,
      entity: body.entity,
      project: body.project,
      language: body.language ?? null,
      editor: body.editor,
      machine: body.machine ?? null,
      timestamp: body.time,
      is_write: body.is_write ? 1 : 0,
    }).execute();
    return c.json({ status: "ok" });
  },
};

export default [addTime];