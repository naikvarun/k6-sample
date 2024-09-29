import {user_demographics} from "./user_demographics";
import {product_popularity} from "./product_popularity";
import {purchase_patterns} from "./purchase_patterns";

export async function mart() {
  const allProcess = [
    user_demographics(),
    product_popularity(),
    purchase_patterns()
  ]

  return Promise.all(allProcess)
}
