import {Router} from "express";
import {respond} from "../controller";
import {
    shareAlbumWithUserController,
    findUserFromSharedAlbumWithPermissionController,
    changePermissionsForUserController,
} from "./shared.controller";

const router = Router();

router.put("/album/:idAlbum/user/:idUser", respond(shareAlbumWithUserController));
router.patch("/album/:idAlbum/user/:idUser", respond(changePermissionsForUserController));
router.get("/album/:idAlbum/user/", respond(findUserFromSharedAlbumWithPermissionController));


export default router;
