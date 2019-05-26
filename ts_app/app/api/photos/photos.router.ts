import {Router} from "express";
import {respond} from "../controller";
import {findPhotosByUserIdController} from "./photos.controller";

const router = Router();

router.get("/", respond(findPhotosByUserIdController));


export default router;
