import db from "../index.js";
import { nanoid } from "nanoid";

interface UserParams {
  username: string;
  auth_id: string;
}

export const checkUsernameExists = async (
  username: string
): Promise<boolean> => {
  const user = await db.auth
    .selectFrom("user")
    .select("id")
    .where("name", "=", username)
    .executeTakeFirst();
  return !!user;
};

export const createUser = async (
  params: UserParams
): Promise<{ id: string; username: string; role: string }> => {
  const newUser = await db.client
    .insertInto("users")
    .values({
      id: nanoid(),
      username: params.username,
      auth_id: params.auth_id,
      role: "user",
      projects: "[]",
      machines: "[]",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .returning(["id", "username", "role"])
    .executeTakeFirstOrThrow();
  return { id: newUser.id, username: newUser.username, role: newUser.role };
};

export const getUserById = async (id: string) => {
  const user = await db.client
    .selectFrom("users")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

  return user;
};

export const getUserByAuthId = async (authId: string) => {
  const user = await db.client
    .selectFrom("users")
    .selectAll()
    .where("auth_id", "=", authId)
    .executeTakeFirst();

  return user;
};
