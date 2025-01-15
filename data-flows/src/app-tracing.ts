import {getTracer} from "../instrumentation";
import {SpanStatusCode} from "@opentelemetry/api";
import {sleepRandom} from "./util";

const appTracer = getTracer('data-pipe', '0.1.0');
export const withTracing = async (func: any, trace: string) => {
  return appTracer.startActiveSpan(trace, async (span) => {
    let statusCode: SpanStatusCode;
    let spanMessage = 'done'
    try {
      await sleepRandom()
      await func(span);
      statusCode = SpanStatusCode.OK;
    } catch (e: unknown) {
      statusCode = SpanStatusCode.ERROR;
      spanMessage = (e instanceof Error) ? e.message: `Error processing ${trace}`;
    }
    span.setStatus({
      code: statusCode,
      message: spanMessage,
    })
    span.end()
  })
}
