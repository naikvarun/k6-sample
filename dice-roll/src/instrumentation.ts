import opentelemetry from '@opentelemetry/api';

import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { Resource } from '@opentelemetry/resources';
import {
  SEMRESATTRS_SERVICE_NAME,
  SEMRESATTRS_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import {
  Sampler,
  AlwaysOnSampler,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';

const Exporter = (process.env.EXPORTER || '').toLowerCase().startsWith('z')
  ? ZipkinExporter
  : OTLPTraceExporter;
export function setupTracing(serviceName: string, serviceVersion: string) {
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SEMRESATTRS_SERVICE_NAME]: serviceName,
      [SEMRESATTRS_SERVICE_VERSION]: serviceVersion,
    }),
    // sampler: filterSampler(ignoreHealthCheck, new AlwaysOnSampler()),
  });
  registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [new HttpInstrumentation(), new ExpressInstrumentation()],
  });

  const exporter = new Exporter({
    serviceName,
  });

  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

  // Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
  provider.register();

  return opentelemetry.trace.getTracer(serviceName);
}
