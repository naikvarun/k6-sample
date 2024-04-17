import opentelemetry, { trace, Span } from '@opentelemetry/api';
import { getLogger } from './logger';
const tracer = trace.getTracer('water-api', '0.0.1');

const logger = getLogger();

export function getRandomNumber(min: number, max: number) {
  return tracer.startActiveSpan('getRandomNumber', (parentSpan: Span) => {
    const rand = Math.floor(Math.random() * (max - min + 1) + min);
    logger.info(`Rolled: ${rand}`);
    parentSpan.end();
    return rand;
  });
}