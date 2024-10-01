import {getTracer} from "../instrumentation";
import {SpanStatusCode} from "@opentelemetry/api";

const appTracer = getTracer('data-pipe', '0.1.0');
export const withTracing = async (func: any, trace: string) => {
  return appTracer.startActiveSpan(trace, async (span) => {
    let statusCode: SpanStatusCode;
    let spanMessage = 'done'
    try {
      await func();
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
