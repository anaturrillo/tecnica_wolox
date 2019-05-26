import {findComment, findCommentByEmail} from "./comments.client";
import {findUserById} from "../users/users.service";
import {InvalidArgumentError} from "../../utils/errors";


async function findCommentsByUserId(userId: number) {
    const user = await findUserById(userId);
    return findCommentByEmail(user.email);
}

export const findCommentsbyQuery = (name: string, userId: number) => {
    const hasUserId = !isNaN(userId);
    const hasName = name !== undefined && name !== null;

    if (hasUserId) {
        return findCommentsByUserId(userId);
    } else if (hasName) {
        return findComment(name);
    }

    throw new InvalidArgumentError("(userId OR name)", {name, userId});
};
