import {Tracer} from '@opentelemetry/api'
import {stage_users} from "./stg_users";
import {stage_products} from "./stg_products";
import {stage_purchases} from "./stg_purchases";
import {withTracing} from "../app-tracing";

export async function stage() {

    await withTracing( stage_users, 'stage-users')
    await withTracing(stage_products, 'stage-products')
    await withTracing(stage_purchases, 'stage_purchases')



}
