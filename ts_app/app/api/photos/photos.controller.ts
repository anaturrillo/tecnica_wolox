import {Request} from "express";
import {findPhotosService} from "./photos.service";
import {IPhoto} from "../types/models";

export const findPhotosController = (req: Request): Promise<IPhoto[]> =>
    findPhotosService(parseInt(req.query.userId));
