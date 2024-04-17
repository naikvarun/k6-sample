import * as schema from "./schema";
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { getLogger } from "../logger";
const logger = getLogger();

import {  Logger } from 'drizzle-orm/logger';
class SQLLogger implements Logger {
    logQuery(query: string, params: unknown[]): void {
        logger.info({query, params})
    }
}
declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: PostgresJsDatabase<typeof schema> | undefined;
}

let db: PostgresJsDatabase<typeof schema>;

if (process.env.NODE_ENV === "production") {
  db = drizzle(postgres(process.env.DATABASE_URL!), { schema, logger: new SQLLogger() });
} else {
  if (!global.db) {
    global.db = drizzle(postgres(process.env.DATABASE_URL!), { schema, logger: new SQLLogger() });
  }
  db = global.db;
}

export { db };