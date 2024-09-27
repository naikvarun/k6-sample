import {stage_users} from "./stg_users";
import {stage_products} from "./stg_products";
import {stage_purchases} from "./stg_purchases";

async function main() {
  const allProcess = [
    stage_users(),
    stage_products(),
    stage_purchases()
  ]

  return Promise.all(allProcess)
}

main().then().catch(console.error);
