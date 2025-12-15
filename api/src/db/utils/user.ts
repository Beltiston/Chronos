import db from "@/db";

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
