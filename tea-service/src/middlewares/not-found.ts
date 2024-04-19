import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "./application-error";
import { getLogger } from "../logger";
const logger = getLogger();
export class NotFoundError extends ApplicationError {
    constructor(message: string) {
        super(message, 404)
    }
} 

export function notFound() {
    return function (req: Request, res: Response, next: NextFunction) {
        logger.warn(`Requesting undefined resource ${req.originalUrl}` )
        throw new NotFoundError(`Resource not found: '${req.originalUrl}'`);
    }
}