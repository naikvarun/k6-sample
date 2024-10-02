import {StagedProduct} from "../data-types";
import fs from "node:fs/promises";
import {getLogger} from "../app.logger";

const logger = getLogger('product-popularity');
export async function product_popularity() {
  logger.info(`Reading staged products`);
  const products = await readRaw('data/stage/products.json');
  const purchases = await readRaw('data/stage/purchases.json');
  logger.info(`Read staged ${products.length} products`);

  const base = purchases.reduce((acc: {[key: number]: number}, purchase: StagedProduct) => {
    acc[purchase.id] = acc[purchase.id] || 0
    acc[purchase.id] += 1;
    return acc
  }, {})

logger.info(`Base products calculated`)

  const martData = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      type: product.type,
      purchase_count: base[product.id] || 0,
    }
  })



  return writeMartFile(`data/mart/product_popularity.json`, martData)
}


async function readRaw(fileName: string): Promise<StagedProduct[]> {
  logger.info(`Reading raw data from ${fileName}`);
  const rawData = await fs.readFile(fileName, 'utf8');
  return JSON.parse(rawData);
}

async function writeMartFile(fileName: string, martData:  { id: number,   name: string   ,type: string  ,purchase_count: number}[]) {
  logger.info(`Writing stage file ${fileName} with ${martData.length} records`);
  return fs.writeFile(fileName, JSON.stringify(martData, null, 2), 'utf8');
}

