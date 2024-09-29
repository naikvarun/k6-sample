import { StagedUser} from "../data-types";
import fs from "node:fs/promises";
import {getLogger} from "../app.logger";

const logger = getLogger();
export async function user_demographics() {
  logger.info(`Reading staged users`);
  const users = await readRaw('data/stage/users.json');
  logger.info(`Read staged ${users.length} users`);
  const cache = users.reduce<{[gender: string]:  { [occupation: string]: {sum_age: number, count: number}}}>((acc, user) => {
    acc [user.gender] =  acc [user.gender] || {}
    const genderCache = acc [user.gender]

    genderCache[user.occupation] = genderCache[user.occupation] || {sum_age: 0, count: 0};
    genderCache[user.occupation].sum_age  += user.age
    genderCache[user.occupation].count  += 1
    return acc
  },  {})


  const martData = Object.keys(cache).map(gender => {
    const titleData = Object.keys(cache[gender]). map(key => ({ title: key, user_count: cache[gender][key].count, average_age: cache[gender][key].sum_age/cache[gender][key].count   }))
    return titleData.map(data=> ({...data, gender}))
  }).reduce((acc, data)=> [...acc, ...data], []);
  logger.info(`Total of ${martData.length} demographics`);

  return writeMartFile(`data/mart/user_demographics.json`, martData)
}


async function readRaw(fileName: string): Promise<StagedUser[]> {
  logger.info(`Reading raw data from ${fileName}`);
  const rawData = await fs.readFile(fileName, 'utf8');
  return JSON.parse(rawData);
}

async function writeMartFile(fileName: string, martData: {title: string, gender: string, user_count: number, average_age: number}[]) {
  logger.info(`Writing stage file ${fileName} with ${martData.length} records`);
  return fs.writeFile(fileName, JSON.stringify(martData, null, 2), 'utf8');
}

