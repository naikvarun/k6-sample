import fs from 'node:fs/promises'
import {makeUserGenerator} from "./user_generator";
import {makePurchaseGenerator} from "./purchase_generator";
import {makeProductGenerator} from "./product-generator";
import {TimeService} from "../time-service";
import path from "node:path";

const TOTAL_USERS = 1000
const TOTAL_PRODUCTS = 100
const timeService: TimeService = {
  now: () => new Date(),
}

const fileWriter = async (dataName: string ,generator: Generator) => {
  const data = [...generator]
  const pathName= path.join('data', 'raw', dataName)
  console.log('Writing to path' + pathName)
  return fs.writeFile(pathName, JSON.stringify(data, null, 2), 'utf8')
}
async function main() {
  const gens = [
      fileWriter('products.json', makeProductGenerator(TOTAL_PRODUCTS, timeService)),
      fileWriter('users.json', makeUserGenerator(TOTAL_USERS, timeService)),
      fileWriter('user-purchase.json', makePurchaseGenerator(TOTAL_USERS, TOTAL_PRODUCTS, timeService))
    ]

  await Promise.all(gens)
}

main().then().catch(console.error)
