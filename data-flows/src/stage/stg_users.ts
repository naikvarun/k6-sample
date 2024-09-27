import {getLogger} from "../app.logger";
import {StagedUser, User} from "../data-types";
import fs from "node:fs/promises";

const logger = getLogger();
export async function stage_users(){
  const rawUsers = await readRaw('data/raw/users.json');
  logger.info(`Reading ${rawUsers.length} users`);
  let stagedUsers = rawUsers.map((user: User): StagedUser => ({
    id: user.id, created_at: user.created_at, updated_at: user.updated_at,
    name: user.name,
    title: user.title,
    age: user.age,
    email: user.email,
    telephone: user.telephone,
  }));
  return writeStageFile(`data/stage/users.json`, stagedUsers);
}


async function readRaw(fileName: string): Promise<User[]> {
  logger.info(`Reading raw data from ${fileName}`);
  const rawData = await fs.readFile(fileName, 'utf8');
  return JSON.parse(rawData);
}

async function writeStageFile(fileName: string, users:  StagedUser[]) {
  logger.info(`Writing stage file ${fileName} with ${users.length} users`);
  return fs.writeFile(fileName, JSON.stringify(users, null, 2), 'utf8');
}

