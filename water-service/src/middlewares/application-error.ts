import { error } from "console"

export class ApplicationError extends Error {
    constructor(message: string, public readonly statusCode: number) {
        super(message)
    }
}

export function isApplicationError(error: unknown) : error is ApplicationError {
    return  error instanceof ApplicationError;
}