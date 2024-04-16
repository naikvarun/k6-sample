import opentelemetry, { trace, Span } from '@opentelemetry/api';
const tracer = trace.getTracer('water-api', '0.0.1');
export function getRandomNumber(min: number, max: number) {
  return tracer.startActiveSpan('getRandomNumber', (parentSpan: Span) => {
    const rand = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(`Rolled: ${rand}`);
    parentSpan.end();
    return rand;
  });
}
