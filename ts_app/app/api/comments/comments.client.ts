import {getData} from "../../utils/helpers";
import axios from "axios";
import {commentsEndpoint} from "../../utils/endpoints";
import {IComment, IPhoto} from "../types/models";

const client = axios.create(commentsEndpoint);

export const findComment = (name: string) =>
    client
        .get<IComment[]>("", {
            params: {
                name,
            },
        })
        .then(getData);

export const findCommentByEmail = (email: string) =>
    client
        .get<IComment[]>("", {
            params: {
                email,
            },
        })
        .then(getData);

