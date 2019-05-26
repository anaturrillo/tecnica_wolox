import {IAlbum} from "../types/models";
import express = require("express");
import {findAlbumsByUserId, findAllAlbums} from "./albums.service";

export const findAllAlbumsController = (req: express.Request): Promise<IAlbum[]> => {
    if (!isNaN(req.query.userId)) {
        return findAlbumsByUserId(parseInt(req.query.userId));
    }
    return findAllAlbums();
};

