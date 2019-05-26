import {Router} from "express";
import {respond} from "../controller";
import {findCommentsbyQueryController} from "./comments.controller";

const router = Router();

router.get("/", respond(findCommentsbyQueryController));


export default router;
