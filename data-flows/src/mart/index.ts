import {user_demographics} from "./user_demographics";
import {product_popularity} from "./product_popularity";
import {purchase_patterns} from "./purchase_patterns";
import {withTracing} from "../app-tracing";


export async function mart() {

    await withTracing(  user_demographics, 'user-demographics')
    await withTracing(product_popularity, 'product-popularity')
      await withTracing(purchase_patterns, 'product-patterns')



}
