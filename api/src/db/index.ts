import { database } from "./kysely";
import * as func from "./utils";

import { authSqlite } from "./auth";

const db = {
  client: database,
  auth: authSqlite,
  utils: func,
};

export default db;
