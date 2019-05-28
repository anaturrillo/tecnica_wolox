import axios from "axios";
import {userEndpoint} from "../../utils/endpoints";
import {getData} from "../../utils/helpers";
import {IUser} from "../types/models";
import {EntityNotFoundError} from "../../utils/errors";

export const findUser = (userId: number): Promise<IUser> => {
    return axios.get(`/${userId}`, userEndpoint)
        .then(getData)
        .catch((e) => {
            if (e.response.status === 404) {
                throw new EntityNotFoundError("User", userId);
            }
            throw e;
        });
};

export const getUsers = (): Promise<IUser[]> => {
    return axios.get("/", userEndpoint).then(getData);
};
