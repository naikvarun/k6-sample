import {config} from 'dotenv'
config()

import {mart} from "./mart";
import {stage} from "./stage";
import {getTracer, setupTracing} from "../instrumentation";
import {withTracing} from "./app-tracing";

// const appTracer = trace.getTracer('data-pipe', '0.1.0');
setupTracing('data-pipe', '0.1.0');

const appTracer = getTracer('data-pipe', '0.1.0');
async function main() {

  return appTracer.startActiveSpan('data-flow-main', async (span) => {

    await withTracing(stage, 'data-flow-stage')
    await withTracing(mart, 'data-flow-mart')
    span.end()
  })

}

main().then().catch(console.error);
