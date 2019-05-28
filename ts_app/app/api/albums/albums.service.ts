import {InvalidArgumentError} from "../../utils/errors";
import {findAlbum, findAlbumsByUserId, findAllAlbums} from "./albums.client";

export const findAlbumsService = (userId: number) => {
    const isEmpty = userId === null || userId === undefined;

    if (isEmpty) {
        return findAllAlbums();
    } else if (Number.isInteger(userId)) {
        return findAlbumsByUserId(userId);
    }
    throw new InvalidArgumentError("User Id", userId);
};

export const findAlbumService = (albumId: number) => {
    if (Number.isInteger(albumId)) {
        return findAlbum(albumId);
    }
    throw new InvalidArgumentError("Album Id", albumId);
};
