import winston from 'winston';
import LokiTransport from 'winston-loki';

let appLogger: winston.Logger;

export function getLogger() {
  if (!appLogger) {
    appLogger = winston.createLogger({
      format: winston.format.combine(winston.format.json()),
      transports: [
        new winston.transports.Console(),
        new LokiTransport({
          labels: { app: 'water-api' },
          host: 'http://127.0.0.1:3100',
        }),
      ],
    });
  }
  return appLogger;
}
