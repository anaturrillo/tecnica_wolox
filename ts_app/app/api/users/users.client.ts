import {userEndpoint} from '../../utils/endpoints'
import axios from 'axios'
import {getData} from "../../utils/helpers";
import {User} from "../types/models";

const client = axios.create(userEndpoint);

export const getUser = (userId):Promise<User> => {
    return client.get(`/${userId}`)
        .then(getData)
        .catch(e => {
            if (e.response.status) {
                throw {error: 'User not found', code: 'not_found'}
            } else {
                throw e;
            }
        })
};

export const getUsers = (): Promise<User[]> => {
    return client.get('/').then(getData)
};