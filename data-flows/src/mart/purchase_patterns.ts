import {StagedPurchase} from "../data-types";
import fs from "node:fs/promises";
import {getLogger} from "../app.logger";

const logger = getLogger('purchase_patterns');

function getDaysDifference(purchased_at: Date | undefined, added_to_cart: Date) {
  if (!purchased_at) {
    return -1
  }// Calculating the time difference
// of two dates



// Calculating the no. of days between
// two dates
  try {
    return Math.round
    ( (purchased_at.getTime() - added_to_cart.getTime()) / (1000 * 3600 * 24))
  } catch (e) {
    logger.error(e)
    return 0
  }

}

export async function purchase_patterns() {
  logger.info(`Reading staged products`);
  const purchases = await readRaw('data/stage/purchases.json');
  logger.info(`Read staged ${purchases.length} purchases`);

  const martData =  purchases.filter((p: StagedPurchase)=>   p.purchased_at !== undefined )
    .map((p: StagedPurchase) => {
      return {
        user_id: p.user_id,
        product_id: p.product_id,
        time_to_purchase: getDaysDifference(p.purchased_at  ? new Date(p.purchased_at) : undefined, new Date(p.added_to_cart)),
      }
    });
  return writeMartFile(`data/mart/purchase_patterns.json`, martData)
}


async function readRaw(fileName: string): Promise<StagedPurchase[]> {
  logger.info(`Reading raw data from ${fileName}`);
  const rawData = await fs.readFile(fileName, 'utf8');
  return JSON.parse(rawData);
}

async function writeMartFile(fileName: string, martData: any[]) {
  logger.info(`Writing mart file ${fileName} with ${martData.length} records`);
  return fs.writeFile(fileName, JSON.stringify(martData, null, 2), 'utf8');
}

