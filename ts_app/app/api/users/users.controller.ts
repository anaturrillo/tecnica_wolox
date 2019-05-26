import {Request} from "express";
import {ControllerFunction} from "../controller";
import {IUser} from "../types/models";
import {findUserById, findAllUsers} from "./users.service";

export const usersController: ControllerFunction<IUser[]> = () =>
    findAllUsers();

export const userController: ControllerFunction<IUser> = (req: Request) =>
    findUserById(parseInt(req.params.id));
