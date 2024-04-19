import { tealeafClient } from '../clients/tealeaf.client';
import { waterClient } from '../clients/water.client';
import { getLogger } from '../logger';

import { TeaResponse, Water } from './tea.model';
import { metrics } from '@opentelemetry/api';
const logger = getLogger();

function waterBuilder() {
  let state: Water = {
    amount: 0,
    temperature: 0,
  };

  const builder = {
    withAmount(amount: number) {
      state = { ...state, amount };
      return builder;
    },
    withTemperature(temp: number) {
      state = { ...state, temperature: temp };
      return builder;
    },
    build(): Water {
      return state;
    },
  };
  return builder;
}

export async function makeTea(
  name: string,
  size: string
): Promise<TeaResponse> {
  const teaLeaf = await tealeafClient.findByName(name);
  const water = await waterClient.findBySize(size);
  logger.info({ teaLeaf, water });
  return {
    water: waterBuilder()
      .withAmount(water.amount)
      .withTemperature(teaLeaf.waterTemperature)
      .build(),
    teaLeaf: {
      id: teaLeaf.id,
      name: teaLeaf.name,
      amount: teaLeaf.suggestedAmount,
    },
    steepingTime: teaLeaf.steepingTime,
  };
}

export const teaService = { makeTea };
