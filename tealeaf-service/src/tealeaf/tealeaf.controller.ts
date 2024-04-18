import { Request, Response } from 'express';
import { tealeafService } from './tealeaf.service';
import { TeaLeafType, isTeaLeafType } from './tealeaf.model';
import { getLogger } from '../logger';
import { BadRequest } from '../middlewares/bad-request';
const logger = getLogger();
export async function findAll(req: Request, res: Response) {
  logger.info(`searching all`);

  const result = await tealeafService.findAll();
  return res.json(result);
}

export async function findById(req: Request, res: Response) {
  const id = req.params.id as string;
  logger.info(`searching by id=${id}`);

  const result = await tealeafService.findById(id);
  if (!result) {
    return res.status(404).json({ error: `resource not found` });
  }
  return res.json(result);
}
export async function search(req: Request, res: Response) {
  const type = req.query.type;
  logger.info(`searching by type=${type}`);
  if (!isTeaLeafType(type)) {
    throw new BadRequest(`Invalid type ${type}`);
  }
  const result = await tealeafService.searchByType(type as TeaLeafType);
  if (!result) {
    return res.status(404).json({ error: `resource not found` });
  }
  return res.json(result);
}

export async function searchByName(req: Request, res: Response) {
  const { name } = req.query;
  logger.info(`searching by name=${name}`);
  if (!name) {
    throw new BadRequest('name required');
  }
  const result = await tealeafService.searchByName(name.toString());
  if (!result) {
    return res.status(404).json({ error: `resource not found` });
  }
  return res.json(result);
}

export const tealeafController = { findAll, findById, search, searchByName };
