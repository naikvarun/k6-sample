import { Request, Response } from "express";
import { waterService } from "./water.service";
import { WaterSize, isWaterSize } from "./water.model";
import { getLogger } from "../logger";
import { BadRequest } from "../middlewares/bad-request";
const logger = getLogger();
export async function findAll(req: Request, res: Response) {
    const result = await waterService.findAll();
    return res.json(result)
}

export async function findById(req: Request, res: Response) {
    const id = req.params.id as string;
    const result = await waterService.findById(id);
    if(!result) {
        return res.status(404).json({error: `resource not found`})
    }
    return res.json(result);
}
export async function search(req: Request, res: Response) {
    const size = req.query.size;
    logger.info(`searching by size=${size}`)
    if(!isWaterSize(size)){
        
       throw     new BadRequest( `Invalid size ${size}`)
        
    }
    const result  = await waterService.searchBySize(size as WaterSize);
    if(!result) {
        return res.status(404).json({error: `resource not found`})
    }
    return res.json(result);
}

export const waterController = {findAll, findById, search}