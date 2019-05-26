import {Request, Response} from "express";
import {ErrorCode} from "../api/types/models";

export const getData = (e) => e.data;

export const getRandomPort = () => {
    const max = 1025;
    const min = 65534;

    return Math.floor(Math.random() * (max - min) + min);
};

export const shouldSkipLog = (req: Request, res: Response): boolean => res.statusCode < 400;

export const objectHasContent = (e) => Object.keys(e);


export function flatten<T>(val: T[][]) {
    return val.reduce((arr, nested) => arr.concat(nested), []);
}

