import {Router} from "express";
import {respond} from "../controller";
import {userController, usersController} from "./users.controller";

const router = Router();

router.get("/", respond(usersController));
router.get("/:id", respond(userController));

export default router;
