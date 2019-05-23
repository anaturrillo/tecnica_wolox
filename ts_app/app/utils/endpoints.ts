import {config} from "./config";

export const userEndpoint = {
    baseURL: `${config.jsonplaceholder.domain}/users`,
    timeout: 5000
};