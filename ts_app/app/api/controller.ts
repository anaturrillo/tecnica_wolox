import {RequestHandler, Request, NextFunction, Response} from "express";

export type ControllerFunction<T> = (req: Request) => Promise<T> | T;

const status = {
    'not-found':404,
    'bad_format':400
};

export function respond<T>(fn: ControllerFunction<T>): RequestHandler {
    return async (req: Request, res: Response) => {
        try {
            const result = await fn(req);
            res.json(result)
        }

        catch (e) {
            res.status(status[e.code] || 500);
            res.json(e.error)
        }
    }
}

/*
type MapFunction <T, S> = (T) => S;

type Map <T, S> = (arr:T[], fn:MapFunction<T, S>) => S[]

const miFnParaElMap:MapFunction<string, number> = (e:string):number => {
    return parseInt(e)
};

const miMap:Map <string, number>= (arr:string[], miFnParaElMap):number[] =>{
    let result = [];
    for (let i=0; i<arr.length; i++){
        result.push( miFnParaElMap(arr[i]) )
    }

    return result
};

*/


