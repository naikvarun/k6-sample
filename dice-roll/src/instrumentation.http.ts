import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import {registerInstrumentations} from '@opentelemetry/instrumentation'
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
const provider = new NodeTracerProvider();
provider.register();

registerInstrumentations({
    instrumentations: [
        new HttpInstrumentation(),
        new ExpressInstrumentation()
    ]
});