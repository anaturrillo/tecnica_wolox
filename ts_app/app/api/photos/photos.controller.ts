import {Request} from "express";
import {findPhotosByUserId, findAllPhotos} from "./photos.service";

export const findPhotosByUserIdController = (req: Request) => {
    if (!isNaN(req.query.userId)) {
        return findPhotosByUserId(parseInt(req.query.userId));
    }
    return findAllPhotos();
};
