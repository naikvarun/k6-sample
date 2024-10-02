import winston from 'winston';
import { OpenTelemetryTransportV3 } from '@opentelemetry/winston-transport'
import opentelemetry   from "@opentelemetry/api";

let appLogger: winston.Logger;
const serviceLabelFormat = (serviceName: string, serviceVersion: string) => {
  return winston.format(info => {
    info['app.name'] = serviceName
    info['app.version'] = serviceVersion
    return info
  })()
}
const datadogTracingFormat = () => {
  return winston.format((info: winston.Logform.TransformableInfo) => {

    const span = opentelemetry.trace.getSpan(opentelemetry.context.active());
    if(span) {
      const {traceId, spanId} =  span.spanContext()
      const traceIdEnd = traceId.slice(traceId.length / 2);
      info['dd.trace_id'] = BigInt(`0x${traceIdEnd}`).toString();
      info['dd.span_id'] = BigInt(`0x${spanId}`).toString();
      info['dd.service'] = 'data-flow'
    }

    return info
  })()
}
export function getLogger(serivceName: string = 'data-flow', serviceVersion: string = '0.0.1') {
  if (!appLogger) {
    appLogger = winston.createLogger({
      format: winston.format.combine(serviceLabelFormat(serivceName, serviceVersion), datadogTracingFormat(), winston.format.json()),
      transports: [
        new winston.transports.Console(),
      ],
    });
  }
  return appLogger;
}
