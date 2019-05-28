import {Request} from "express";
import {
    changePermissionsForUser,
    findSharedAlbumUsersByPermissionService,
    shareAlbumWithUser,
    ShareCodes,
} from "./shared.service";
import {IUser} from "../types/models";

export const shareAlbumWithUserController = (req: Request): Promise<ShareCodes> =>
    shareAlbumWithUser(
        parseInt(req.params.albumId),
        parseInt(req.params.userId),
        req.body.write,
        req.body.read);

export const findSharedAlbumUsersByPermissionController = (req: Request): Promise<IUser[]> =>
    findSharedAlbumUsersByPermissionService(
        parseInt(req.params.albumId),
        req.query.permission,
    );

export const changeUserPermissionsController = (req: Request): Promise<ShareCodes> =>
    changePermissionsForUser(
        parseInt(req.params.albumId),
        parseInt(req.params.userId),
        req.body.permission,
        req.body.value);

