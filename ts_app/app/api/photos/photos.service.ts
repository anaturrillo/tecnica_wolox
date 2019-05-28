import {findAlbumsService} from "../albums/albums.service";
import {IAlbum, IPhoto} from "../types/models";
import {findAllPhotos, findPhotosByAlbumId} from "./photos.client";
import {flatten} from "../../utils/helpers";
import {InvalidArgumentError} from "../../utils/errors";


export const findPhotosService = async (userId?: number): Promise<IPhoto[]> => {
    const isEmpty = userId === null || userId === undefined;

    if (isEmpty) {
        return findAllPhotos();
    } else if (Number.isInteger(userId)) {
        const albums: IAlbum[] = await findAlbumsService(userId);
        const nestedPhotos: IPhoto[][] = await Promise.all(albums.map((e) => findPhotosByAlbumId(e.id)));
        return flatten(nestedPhotos);
    }

    throw new InvalidArgumentError("User Id", userId);
};
