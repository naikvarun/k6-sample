import {stage_users} from "./stg_users";
import {stage_products} from "./stg_products";
import {stage_purchases} from "./stg_purchases";

export async function stage() {
  const allProcess = [
    stage_users(),
    stage_products(),
    stage_purchases()
  ]

  return Promise.all(allProcess)
}
