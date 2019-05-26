import {Request} from "express";
import {
    shareAlbumWithUser,
    findUserFromSharedAlbumWithPermission,
    changePermissionsForUser,
} from "./shared.service";

export const shareAlbumWithUserController = (req: Request) =>
    shareAlbumWithUser(parseInt(req.params.idAlbum), parseInt(req.params.idUser), req.body.write, req.body.read);

export const findUserFromSharedAlbumWithPermissionController = (req: Request) =>
    findUserFromSharedAlbumWithPermission(parseInt(req.params.idAlbum), req.query.permission);

export const changePermissionsForUserController = (req: Request) =>
    changePermissionsForUser(
        parseInt(req.params.idAlbum),
        parseInt(req.params.idUser),
        req.body.permission,
        req.body.value,
    );

