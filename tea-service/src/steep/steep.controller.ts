import { Request, Response } from 'express';
import { getLogger } from '../logger';
import { steepService } from './steep.service';

const logger = getLogger();

export async function steep(req: Request, res: Response) {
  //return res.json({ ok: 'ok' });
  logger.info(`steep tea`);
  try {
    const teaLeaves = await steepService.getTealeaves();
    const water = await steepService.getWater();
    return res.json({ teaLeaves, water });
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export const steepController = { steep };
