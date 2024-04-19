import { ApplicationError } from "./application-error";

export class BadRequest extends ApplicationError {
    constructor(message: string) {
        super(message, 400)
    }
}