import {findUser, getUsers} from "./users.client";
import {InvalidArgumentError} from "../../utils/errors";

export const findAllUsersService = () => getUsers();

export const findUserByIdService = (userId: number) => {
    if (Number.isInteger(userId)) {
        return findUser(userId);
    }

    throw new InvalidArgumentError("User id", userId);
};
