import {ControllerFunction} from "../controller";
import {Request} from "express";
import {user, users} from './users.service'
import {User} from "../types/models";

export const usersController:ControllerFunction<User[]> = (req: Request) =>
    users();

export const userController:ControllerFunction<User> = (req: Request) =>
    user(parseInt(req.params.id));