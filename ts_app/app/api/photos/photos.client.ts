import {getData} from "../../utils/helpers";
import axios from "axios";
import {photosEndpoint} from "../../utils/endpoints";
import {IPhoto} from "../types/models";

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

export const findAllPhotos = () => photosClient.get<IPhoto[]>("").then(getData);
