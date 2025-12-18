import Database from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";

import { AuthSchema } from "../types/auth-schema.js";

export const sqlite: any = new Database("./db/auth.db");

export const authSqlite = new Kysely<AuthSchema>({
  dialect: new SqliteDialect({
    database: sqlite,
  }),
});
