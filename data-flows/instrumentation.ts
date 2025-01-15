import { NodeSDK, resources} from "@opentelemetry/sdk-node";
import {ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION} from '@opentelemetry/semantic-conventions'
import {Resource} from '@opentelemetry/resources'
import {OTLPTraceExporter} from '@opentelemetry/exporter-trace-otlp-http'
import {OTLPLogExporter} from '@opentelemetry/exporter-logs-otlp-http'
import {OTLPMetricExporter} from '@opentelemetry/exporter-metrics-otlp-http'
import {
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import {trace, metrics, Meter} from "@opentelemetry/api";
import {LoggerProvider, SimpleLogRecordProcessor, ConsoleLogRecordExporter} from '@opentelemetry/sdk-logs'
import {NodeTracerProvider} from'@opentelemetry/sdk-trace-node'
import {logs} from '@opentelemetry/api-logs'
import {WinstonInstrumentation} from "@opentelemetry/instrumentation-winston";
import {
  ConsoleMetricExporter,
  MeterProvider,
  PeriodicExportingMetricReader,
} from '@opentelemetry/sdk-metrics';
import opentelemetry from '@opentelemetry/api';






let appMeter : Meter;
export const setupTracing = (serviceName: string, serviceVersion: string) => {
  const resource = new Resource({
    [ATTR_SERVICE_NAME]: serviceName,
    [ATTR_SERVICE_VERSION]: serviceVersion,
  })


  const logExporter = new OTLPLogExporter();
  // const logExporter = new ConsoleLogRecordExporter();
  const loggerProvider = new LoggerProvider();

  loggerProvider.addLogRecordProcessor( new SimpleLogRecordProcessor(logExporter));
  logs.setGlobalLoggerProvider(loggerProvider);
  const exporter = new OTLPTraceExporter()


  const metricReader = new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter(),
    // Default is 60000ms (60 seconds). Set to 10 seconds for demonstrative purposes only.
    exportIntervalMillis: 1000,
  });
  const myServiceMeterProvider = new MeterProvider({
    resource: resource,
    readers: [metricReader],
  });

  opentelemetry.metrics.setGlobalMeterProvider(myServiceMeterProvider);


  const sdk = new NodeSDK({
    resource,
    spanProcessors: [new SimpleSpanProcessor(exporter)],
    traceExporter: exporter,
    instrumentations: [
      new WinstonInstrumentation({
        disableLogSending: false,
        logHook: (span, record) => {
          record['service-name'] = serviceName
          record['service-version'] = serviceVersion
        }
      })
    ]
  });


  sdk.start();
  appMeter = metrics.getMeter(serviceName, serviceVersion);
}
export const getTracer = (serviceName: string, serviceVersion: string) => {
  return trace.getTracer(serviceName, serviceVersion);
}


export const getCounter  = (counterName: string) => {
  return appMeter.createCounter(counterName);
}
