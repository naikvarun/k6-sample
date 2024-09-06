import winston from 'winston';
import LokiTransport from 'winston-loki';
import opentelemetry   from "@opentelemetry/api";

let appLogger: winston.Logger;

const datadogTracingFormat = () => {
  return winston.format((info: winston.Logform.TransformableInfo) => {

    const span = opentelemetry.trace.getSpan(opentelemetry.context.active());
    if(span) {
      const {traceId, spanId} =  span.spanContext()
      const traceIdEnd = traceId.slice(traceId.length / 2);
      info['dd.trace_id'] = BigInt(`0x${traceIdEnd}`).toString();
      info['dd.span_id'] = BigInt(`0x${spanId}`).toString();
    }

    return info
  })()
}

export function getLogger() {
  if (!appLogger) {
    appLogger = winston.createLogger({
      format: winston.format.combine(datadogTracingFormat(), winston.format.json()),
      transports: [
        new winston.transports.Console()
      ],
    });
  }
  return appLogger;
}
