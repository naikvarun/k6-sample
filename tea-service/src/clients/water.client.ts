import { httpClient } from './client';

async function findBySize(size: string) {
  return httpClient.get(
    `${process.env.WATER_SERVICE_URI}/api/water/search/findBySize?size=${size}`
  );
}

async function findAll() {
  return httpClient.get(`${process.env.WATER_SERVICE_URI}/api/water`);
}

export const waterClient = { findAll, findBySize };
