import { database } from "./kysely.js";
import * as func from "./utils/index.js";

import { authSqlite } from "./auth.js";

const db = {
  client: database,
  auth: authSqlite,
  utils: func,
};

export default db;
