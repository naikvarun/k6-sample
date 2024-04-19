import { metrics } from '@opentelemetry/api';
import { appConfig } from '../app.config';

const meter = metrics.getMeter(appConfig.AppName, appConfig.AppVersion);
const counter = meter.createCounter('tea.make');

function count(name: string, size: string) {
  counter.add(1, { name, size });
}

export const teaCounter = { count };
