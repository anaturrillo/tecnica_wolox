import {IAlbum} from "../types/models";
import {findAlbumsService} from "./albums.service";
import express = require("express");

export const findAllAlbumsController = (req: express.Request): Promise<IAlbum[]> =>
    findAlbumsService(parseInt(req.query.userId));
