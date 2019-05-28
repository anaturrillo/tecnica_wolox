import {Request} from "express";
import {ControllerFunction} from "../controller";
import {IUser} from "../types/models";
import {findUserByIdService, findAllUsersService} from "./users.service";

export const usersController: ControllerFunction<IUser[]> = () =>
    findAllUsersService();

export const userController: ControllerFunction<IUser> = (req: Request) =>
    findUserByIdService(parseInt(req.params.id));
