import {getLogger} from "../app.logger";
import {Product, StagedProduct} from "../data-types";
import fs from "node:fs/promises";

const logger = getLogger('stage-products');
export async function stage_products(){
  const rawProducts = await readRaw('data/raw/products.json');
  logger.info(`Reading ${rawProducts.length} products`);
  const stagedProducts = rawProducts.map((product: Product): StagedProduct => ({...product}))
  return writeStageFile(`data/stage/products.json`, stagedProducts);
}


async function readRaw(fileName: string): Promise<Product[]> {
  logger.info(`Reading raw data from ${fileName}`);
  const rawData = await fs.readFile(fileName, 'utf8');
  return JSON.parse(rawData);
}

async function writeStageFile(fileName: string, stagedProducts:  StagedProduct[]) {
  logger.info(`Writing stage file ${fileName} with ${stagedProducts.length} products`);
  return fs.writeFile(fileName, JSON.stringify(stagedProducts, null, 2), 'utf8');
}

