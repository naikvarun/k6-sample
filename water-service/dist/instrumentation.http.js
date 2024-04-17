"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_trace_node_1 = require("@opentelemetry/sdk-trace-node");
const instrumentation_1 = require("@opentelemetry/instrumentation");
const instrumentation_http_1 = require("@opentelemetry/instrumentation-http");
const instrumentation_express_1 = require("@opentelemetry/instrumentation-express");
const provider = new sdk_trace_node_1.NodeTracerProvider();
provider.register();
(0, instrumentation_1.registerInstrumentations)({
    instrumentations: [
        new instrumentation_http_1.HttpInstrumentation(),
        new instrumentation_express_1.ExpressInstrumentation()
    ]
});
