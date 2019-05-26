import {getDb} from "../db";
import {findAlbum} from "../albums/albums.service";
import {InvalidArgumentError} from "../../utils/errors";
import {findUserById} from "../users/users.service";
import {IAlbumUsers} from "../types/models";
import {permissionQuerys, shareAlbumStmt, updatePermissionStmts} from "./shared.statements";

export const shareAlbumWithUser = async (albumId: number, userId: number, write: boolean, read: boolean) => {
    validateAlbumExists(albumId);
    validateUserExists(userId);
    const db = await getDb();
    return db
        .run(shareAlbumStmt, [albumId, userId, write, read]);
};

export const findUserFromSharedAlbumWithPermission = async (albumId: number, permission: string) => {
    validateAlbumExists(albumId);
    const query = permissionQuerys[permission];
    if (!query) {
        throw new InvalidArgumentError("Permission", permission);
    }
    const db = await getDb();
    const albumUsers: IAlbumUsers[] = await db.all(query, [albumId]);

    return Promise.all(albumUsers.map((e) => findUserById(e.USER_ID)));
};

export const changePermissionsForUser = async (
    albumId: number,
    userId: number,
    permission: string,
    value: boolean,
) => {
    validateAlbumExists(albumId);
    validateUserExists(userId);
    const stmt = updatePermissionStmts[permission];
    if (!stmt) {
        throw new InvalidArgumentError("Permission", permission);
    }
    const db = await getDb();
    return db.run(stmt, [value, albumId, userId]);
};

async function validateAlbumExists(albumId: number) {
    try {
        await findAlbum(albumId);
    } catch (e) {
        if (e.code === "404") {
            throw new InvalidArgumentError("Album", albumId);
        }
    }
}

async function validateUserExists(userId: number) {
    try {
        await findUserById(userId);
    } catch (e) {
        if (e.code === "404") {
            throw new InvalidArgumentError("User", userId);
        }
    }
}
