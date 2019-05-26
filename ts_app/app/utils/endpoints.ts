import {config} from "./config";

const domain = config.jsonplaceholder.domain;
const timeout = 5000;

export const albumsEndpoint = {
    baseURL: `${domain}/albums`,
    timeout,
};

export const userEndpoint = {
    baseURL: `${domain}/users`,
    timeout,
};

export const photosEndpoint = {
    baseURL: `${domain}/photos`,
    timeout,
};

export const commentsEndpoint = {
    baseURL: `${domain}/comments`,
    timeout,
};
