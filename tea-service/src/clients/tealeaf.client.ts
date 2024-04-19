import { httpClient } from './client';

async function findByName(name: string) {
  return httpClient.get(
    `${process.env.TEALEAF_SERVICE_URI}/api/tealeaves/search/findByName?name=${name}`
  );
}

async function findAll() {
  return httpClient.get(`${process.env.TEALEAF_SERVICE_URI}/api/tealeaves`);
}

export const tealeafClient = { findAll, findByName };
