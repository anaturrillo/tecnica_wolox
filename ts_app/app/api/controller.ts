import {Request, RequestHandler, Response} from "express";
import {ErrorCode} from "./types/models";

export type ControllerFunction<T> = (req: Request) => Promise<T> | T;

const status = {
    [ErrorCode.NOT_FOUND] : 404,
    [ErrorCode.BAD_FORMAT] : 400,
};

export function respond<T>(fn: ControllerFunction<T>): RequestHandler {
    return async (req: Request, res: Response) => {
        try {
            const result = await fn(req);
            res.json(result);
        } catch (e) {
            console.error(e)
            res.status(status[e.code] || 500);
            res.json(e.error);
        }
    };
}

