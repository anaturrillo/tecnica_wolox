import {findCommentsByEmail, findCommentsByName} from "./comments.client";
import {InvalidArgumentError} from "../../utils/errors";
import {IComment} from "../types/models";

export const findCommentsbyQuery = (name: string, email: string): Promise<IComment> => {
    const hasEmail = email !== undefined && email !== null;
    const hasName = name !== undefined && name !== null;

    if (hasEmail) {
        return findCommentsByEmail(email);
    } else if (hasName) {
        return findCommentsByName(name);
    }

    throw new InvalidArgumentError("(name OR email)", "null");
};
