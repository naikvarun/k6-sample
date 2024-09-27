import {getLogger} from "../app.logger";
import {Purchase, StagedPurchase, StagedUser, User} from "../data-types";
import fs from "node:fs/promises";

const logger = getLogger();
export async function stage_purchases(){
  const rawPurchases = await readRaw('data/raw/user_purchase.json');
  logger.info(`Reading ${rawPurchases.length} purchases`);
  let stagedPurchases = rawPurchases.map((user: Purchase): StagedPurchase => ({...user}));
  return writeStageFile(`data/stage/users.json`, stagedPurchases);
}


async function readRaw(fileName: string): Promise<Purchase[]> {
  logger.info(`Reading raw data from ${fileName}`);
  const rawData = await fs.readFile(fileName, 'utf8');
  return JSON.parse(rawData);
}

async function writeStageFile(fileName: string, users:  StagedPurchase[]) {
  logger.info(`Writing stage file ${fileName} with ${users.length} purchases`);
  return fs.writeFile(fileName, JSON.stringify(users, null, 2), 'utf8');
}

