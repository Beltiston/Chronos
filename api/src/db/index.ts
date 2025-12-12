import { database } from "./kysely";
import * as func from "./utils";

const db = {
  client: database,
  func,
};

export default db;

