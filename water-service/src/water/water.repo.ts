import { Water, WaterId, WaterSize } from './water.model';
import { db } from '../db/index';
import { water } from '../db/schema';
import { eq } from 'drizzle-orm';
import { getLogger } from '../logger';
const logger = getLogger();

export async function findAll(): Promise<Water[]> {
  // const { db } = await getConnection();
  return db.select().from(water);
}
export async function findById(id: WaterId): Promise<Water | undefined> {
  // const { db } = await getConnection();
  const w = await db.select().from(water).where(eq(water.id, id.toUpperCase()));
  if (w.length >= 1) {
    logger.warn(`Got water in db by id='${id}`);
    return w[0];
  } else {
    logger.warn(`No water in db by id='${id}`);
    return undefined;
  }
}

export async function searchBySize(
  size: WaterSize
): Promise<Water | undefined> {
  // const { db } = await getConnection();
  const w = await db.select().from(water).where(eq(water.size, size)).limit(1);
  if (w.length >= 1) {
    logger.warn(`Got water in db by size='${size}`);
    return w[0];
  } else {
    logger.warn(`No water in db by size='${size}`);
    return undefined;
  }
}

export const waterRepo = { findAll, findById, searchBySize };
