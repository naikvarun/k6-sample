import { Request, Response } from 'express';
import { teaService } from './tea.service';
import { TeaResponse } from './tea.model';
import { getLogger } from '../logger';
import { BadRequest } from '../middlewares/bad-request';
import { teaCounter } from '../instr/tea.counter';
const logger = getLogger();
export async function makeTea(req: Request, res: Response) {
  logger.info(`making tea`);
  const { name, size } = req.query;
  if (!name || !size) {
    throw new BadRequest(`Name and size required to make tea`);
  }
  teaCounter.count(name.toString(), size.toString());
  const result = await teaService.makeTea(name.toString(), size.toString());
  return res.json(result);
}

export const teaController = { makeTea };
