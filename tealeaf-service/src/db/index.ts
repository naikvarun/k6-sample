import * as schema from './schema';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { getLogger } from '../logger';
const logger = getLogger();

import { Logger } from 'drizzle-orm/logger';
import { Client, Pool } from 'pg';
class SQLLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    logger.info({ query, params });
  }
}
declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: NodePgDatabase<typeof schema> | undefined;
  var pgClient: Pool;
}

function getPGClient(): Pool {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL!,
  });
  return client;
}

let db: NodePgDatabase<typeof schema>;
let pgClient: Pool;

if (process.env.NODE_ENV === 'production') {
  pgClient = getPGClient();
  db = drizzle(pgClient, {
    schema,
    logger: new SQLLogger(),
  });
} else {
  if (!global.db) {
    global.pgClient = getPGClient();
    global.db = drizzle(global.pgClient, {
      schema,
      logger: new SQLLogger(),
    });
  }
  pgClient = global.pgClient;
  db = global.db;
}
/* (async () => {
  if (process.env.NODE_ENV === 'production') {
    pgClient = await getPGClient();
    db = drizzle(pgClient, {
      schema,
      logger: new SQLLogger(),
    });
  } else {
    if (!global.db) {
      global.pgClient = await getPGClient();
      global.db = drizzle(global.pgClient, {
        schema,
        logger: new SQLLogger(),
      });
    }
    pgClient = global.pgClient;
    db = global.db;
  }
  return { db, pgClient };
})(); */
export { db, pgClient };
