import {ErrorCode} from "../api/types/models";

export abstract class AppError extends Error {
    public readonly code: ErrorCode;

    protected constructor(msg: string, code: ErrorCode) {
        super(msg);
        this.code = code;
    }
}

export class InvalidArgumentError extends AppError {
    constructor(argument: string, value: unknown) {
        super(`${argument} is missing or badly formatted. Recieved:${JSON.stringify(value)}`, ErrorCode.BAD_FORMAT);
    }
}

export class EntityNotFoundError extends AppError {
    constructor(argument: string, value: unknown) {
        super(`${argument} doesn't exist. Recieved:${JSON.stringify(value)}`, ErrorCode.NOT_FOUND);
    }
}
