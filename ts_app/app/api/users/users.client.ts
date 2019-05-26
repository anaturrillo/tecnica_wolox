import axios from "axios";
import {userEndpoint} from "../../utils/endpoints";
import {getData} from "../../utils/helpers";
import {IUser} from "../types/models";
import {EntityNotFoundError} from "../../utils/errors";

const client = axios.create(userEndpoint);

export const findUsers = (userId): Promise<IUser> => {
    return client.get(`/${userId}`)
        .then(getData)
        .catch((e) => {
            if (e.response.status === 404) {
                throw new EntityNotFoundError("User", userId);
            }
            throw e;
        });
};

export const getUsers = (): Promise<IUser[]> => {
    return client.get("/").then(getData);
};
