import {getData} from "../../utils/helpers";
import axios from "axios";
import {albumsEndpoint, photosEndpoint} from "../../utils/endpoints";
import {IPhoto} from "../types/models";

const albumsClient = axios.create(albumsEndpoint);
const photosClient = axios.create(photosEndpoint);

// TODO agregar filtro por email
export const findPhotosByAlbumId = (albumId: number) =>
    photosClient
        .get<IPhoto[]>("", {
            params: {
                albumId,
            },
        })
        .then(getData);

export const findAllPhotosClient = () => photosClient.get<IPhoto[]>("").then(getData);
