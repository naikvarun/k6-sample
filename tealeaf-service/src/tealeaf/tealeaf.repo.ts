import { TeaLeaf, TeaLeafId, TeaLeafType } from './tealeaf.model';
import { db } from '../db/index';
import { tealeaf } from '../db/schema';
import { eq } from 'drizzle-orm';
import { getLogger } from '../logger';
const logger = getLogger();

export async function findAll(): Promise<TeaLeaf[]> {
  // const { db } = await getConnection();
  return db.select().from(tealeaf);
}
export async function findById(id: TeaLeafId): Promise<TeaLeaf | undefined> {
  // const { db } = await getConnection();
  const w = await db
    .select()
    .from(tealeaf)
    .where(eq(tealeaf.id, id.toUpperCase()));
  if (w.length >= 1) {
    logger.warn(`Got water in db by id='${id}`);
    return w[0];
  } else {
    logger.warn(`No water in db by id='${id}`);
    return undefined;
  }
}

export async function searchByType(
  type: TeaLeafType
): Promise<TeaLeaf | undefined> {
  // const { db } = await getConnection();
  const w = await db
    .select()
    .from(tealeaf)
    .where(eq(tealeaf.type, type))
    .limit(1);
  if (w.length >= 1) {
    logger.warn(`Got tealeaf in db by size='${type}`);
    return w[0];
  } else {
    logger.warn(`No tealeaf in db by size='${type}`);
    return undefined;
  }
}

export async function searchByName(name: string): Promise<TeaLeaf | undefined> {
  // const { db } = await getConnection();
  const w = await db
    .select()
    .from(tealeaf)
    .where(eq(tealeaf.name, name))
    .limit(1);
  if (w.length >= 1) {
    logger.info(`Got tealeaf in db by name='${name}`);
    return w[0];
  } else {
    logger.warn(`No tealeaf in db by name='${name}`);
    return undefined;
  }
}

export const tealeafRepo = { findAll, findById, searchByType, searchByName };
