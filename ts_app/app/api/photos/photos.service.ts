import {findAlbumsByUserId} from "../albums/albums.service";
import {IAlbum, IPhoto} from "../types/models";
import {findPhotosByAlbumId, findAllPhotosClient} from "./photos.client";
import {flatten} from "../../utils/helpers";

export const findPhotosByUserId = async (userId: number): Promise<IPhoto[]> => {
    const albums: IAlbum[] = await findAlbumsByUserId(userId);
    const nestedPhotos: IPhoto[][] = await Promise.all(albums.map((e) => findPhotosByAlbumId(e.id)));
    return flatten(nestedPhotos);
};

export const findAllPhotos = findAllPhotosClient;
