import { tealeafClient } from '../clients/tealeaf.client';
import { waterClient } from '../clients/water.client';

async function getWater() {
  return waterClient.findAll();
}

async function getTealeaves() {
  return tealeafClient.findAll();
}
export const steepService = { getWater, getTealeaves };
