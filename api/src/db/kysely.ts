import { Kysely, SqliteDialect } from "kysely";
import Database from "better-sqlite3";
import { DatabaseSchema } from "../types/databaseSchema.js";

const sqlite = new Database("./db/main.db");

export const database = new Kysely<DatabaseSchema>({
  dialect: new SqliteDialect({
    database: sqlite,
  }),
});
