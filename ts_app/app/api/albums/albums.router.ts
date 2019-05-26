import {Router} from "express";
import {respond} from "../controller";
import {findAllAlbumsController} from "./albums.controller";

const router = Router();

router.get("/", respond(findAllAlbumsController));


export default router;
