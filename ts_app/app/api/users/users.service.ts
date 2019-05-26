import {findUsers, getUsers} from "./users.client";
import {InvalidArgumentError} from "../../utils/errors";

export const findAllUsers = () => getUsers();

export const findUserById = (userId: number) => {
    if (Number.isInteger(userId)) {
        return findUsers(userId);
    }

    throw new InvalidArgumentError("User id", userId);
};
