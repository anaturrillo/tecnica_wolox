import {Request} from "express";
import {findCommentsbyQuery} from "./comments.service";

export const findCommentsbyQueryController = (request: Request) =>
    findCommentsbyQuery(request.query.name, parseInt(request.query.userId));
