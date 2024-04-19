import { NextFunction, Request, Response } from "express";
import { isApplicationError } from "./application-error";
import { getLogger } from "../logger";
const logger = getLogger();
export function errorHandler() {
    return function (error: Error, req: Request, res: Response, next: NextFunction) {
        logger.error(error.message);
        if(!isApplicationError(error)) {
            return res.status(500).json({error: error.message})
        } else {
        return res.status(error.statusCode).json({error: error.message})
        }
    }
}