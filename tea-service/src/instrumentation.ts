import opentelemetry from '@opentelemetry/api';
import process from 'process';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { Resource } from '@opentelemetry/resources';
import {
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_VERSION,
  SemanticResourceAttributes
} from '@opentelemetry/semantic-conventions';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import {
  Sampler,
  AlwaysOnSampler,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import {
  PeriodicExportingMetricReader,
  MeterProvider,
} from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PgInstrumentation } from '@opentelemetry/instrumentation-pg';
import {LoggerProvider, BatchLogRecordProcessor,SimpleLogRecordProcessor, ConsoleLogRecordExporter} from '@opentelemetry/sdk-logs'
import {logs} from '@opentelemetry/api-logs'
import {WinstonInstrumentation} from '@opentelemetry/instrumentation-winston'
import {OTLPLogExporter} from "@opentelemetry/exporter-logs-otlp-http";
import {
  SEMRESATTRS_DEPLOYMENT_ENVIRONMENT
} from "@opentelemetry/semantic-conventions/build/src/resource/SemanticResourceAttributes";
// import {OTLPLogExporter} from '@opentelemetry/exporter-logs-otlp-http'

const Exporter = (process.env.EXPORTER || '').toLowerCase().startsWith('z')
  ? ZipkinExporter
  : OTLPTraceExporter;

// const serviceName = 'water-api';
// const serviceVersion = '0.0.1';
export function setupTracing(serviceName: string, serviceVersion: string) {
  const resource = new Resource({
    [SEMRESATTRS_SERVICE_NAME]: serviceName,
    [SEMRESATTRS_SERVICE_VERSION]: serviceVersion,
    [SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]: 'demo'
  });

  console.log(resource)
  const provider = new NodeTracerProvider({
   resource,
    // sampler: filterSampler(ignoreHealthCheck, new AlwaysOnSampler()),
  });

  const exporter = new Exporter({
    serviceName,
  });

  const loggerProvider = new LoggerProvider()
  /*const collectorOptions = {
    // url: '<opentelemetry-collector-url>', // url is optional and can be omitted - default is http://localhost:4318/v1/logs
    headers: {}, // an optional object containing custom headers to be sent with each request
    concurrencyLimit: 1, // an optional limit on pending requests
  };*/
  // const logExporter = new OTLPLogExporter(collectorOptions);
  loggerProvider.addLogRecordProcessor(
    new SimpleLogRecordProcessor(new OTLPLogExporter()),
    // new BatchLogRecordProcessor(logExporter)
  )
  logs.setGlobalLoggerProvider(loggerProvider);


  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

  // Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
  provider.register();
  registerInstrumentations({
    instrumentations: [
      /* new HttpInstrumentation({
        
      }), */
      new ExpressInstrumentation({}),
      new PgInstrumentation(),

    ],
  });
  const metricReader = new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter(),

    // Default is 60000ms (60 seconds). Set to 10 seconds for demonstrative purposes only.
    exportIntervalMillis: 10000,
  });

  const sdk = new NodeSDK({
    resource,
    metricReader,
    traceExporter: exporter,
    instrumentations: [
      getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-fs': { enabled: false },
      }),
      new HttpInstrumentation(),
      new ExpressInstrumentation(),
      new PgInstrumentation(),
      new WinstonInstrumentation({

      }),
    ],
  });

  sdk.start();

  process.on('SIGTERM', () => {
    provider
      .shutdown()
      .then(() => console.log(`provider shutdown`))
      .catch((err) => console.log('Error shutting down ', err));
    metricReader
      .shutdown()
      .then(() => console.log(`Metric reader shutdown`))
      .catch((err) => console.log('Error shutting down metric reader', err));
    sdk
      .shutdown()
      .then(
        () => console.log('SDK shut down successfully'),
        (err) => console.log('Error shutting down SDK', err)
      )
      .finally(() => process.exit(0));
  });

  return opentelemetry.trace.getTracer(serviceName);
}
