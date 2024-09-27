import winston from 'winston';

let appLogger: winston.Logger;

export function getLogger() {
  if (!appLogger) {
    appLogger = winston.createLogger({
      format: winston.format.combine(winston.format.json()),
      transports: [
        new winston.transports.Console(),
      ],
    });
  }
  return appLogger;
}
