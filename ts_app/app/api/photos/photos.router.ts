import {Router} from "express";
import {respond} from "../controller";
import {findPhotosController} from "./photos.controller";

const router = Router();

router.get("/", respond(findPhotosController));


export default router;
