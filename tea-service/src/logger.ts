import {appConfig} from './app.config';
import winston from 'winston';
import opentelemetry from "@opentelemetry/api";

let appLogger: winston.Logger;
const serviceLabelFormat = () => {
  return winston.format(info => {
    info['app.name'] = appConfig.AppName
    info['app.version'] = appConfig.AppVersion
    return info
  })()
}
const datadogTracingFormat = () => {
  return winston.format((info: winston.Logform.TransformableInfo) => {

    const span = opentelemetry.trace.getSpan(opentelemetry.context.active());
    if (span) {
      const {traceId, spanId} = span.spanContext()
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
      format: winston.format.combine(serviceLabelFormat(), datadogTracingFormat(), winston.format.json()),
      transports: [
        new winston.transports.Console()

      ],
    });
  }
  return appLogger;
}
