import {IAlbum} from "../types/models";
import {getData} from "../../utils/helpers";
import axios from "axios";
import {albumsEndpoint} from "../../utils/endpoints";

const client = axios.create(albumsEndpoint);

export const findAlbumsByUserId = (userId: number) =>
    client
        .get<IAlbum[]>("", {
            params: {
                userId,
            },
        })
        .then(getData);

export const findAllAlbums = () => client.get("").then(getData);


export const findAlbum = (albumId: number) =>
    client
        .get<IAlbum[]>("", {
            params: {
                id: albumId,
            },
        })
        .then(getData);
