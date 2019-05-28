import {Router} from "express";
import {respond} from "../controller";
import {
    shareAlbumWithUserController,
    findSharedAlbumUsersByPermissionController,
    changeUserPermissionsController,
} from "./shared.controller";

const router = Router();

router.put("/album/:albumId/user/:userId", respond(shareAlbumWithUserController));
router.patch("/album/:albumId/user/:userId", respond(changeUserPermissionsController));
router.get("/album/:albumId/user/", respond(findSharedAlbumUsersByPermissionController));


export default router;
