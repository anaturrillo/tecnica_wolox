import {getDb} from "../db";
import {findAlbumService} from "../albums/albums.service";
import {InvalidArgumentError} from "../../utils/errors";
import {findUserByIdService} from "../users/users.service";
import {IAlbumUsers, IUser} from "../types/models";
import {permissionQuerys, shareAlbumStmt, updatePermissionStmts} from "./shared.statements";

export enum ShareCodes {
    OK = "OK",
}

export const shareAlbumWithUser = async (
    albumId: number,
    userId: number,
    write: boolean,
    read: boolean): Promise<ShareCodes.OK> => {

    await validateAlbumExists(albumId);
    await validateUserExists(userId);
    const db = await getDb();
    return db
        .run(shareAlbumStmt, [albumId, userId, write, read])
        .then(() => ShareCodes.OK);
};

export const findSharedAlbumUsersByPermissionService =
    async (albumId: number, permission: string): Promise<IUser[]> => {
        await validateAlbumExists(albumId);
        const query = permissionQuerys[permission];
        if (!query) {
            throw new InvalidArgumentError("Permission", permission);
        }
        const db = await getDb();
        const albumUsers: IAlbumUsers[] = await db.all(query, [albumId]);

        return Promise.all(albumUsers.map((e) => findUserByIdService(e.USER_ID)));
    };

export const changePermissionsForUser = async (
    albumId: number,
    userId: number,
    permission: string,
    value: boolean,
) => {
    await validateAlbumExists(albumId);
    await validateUserExists(userId);
    const stmt = updatePermissionStmts[permission];
    if (!stmt) {
        throw new InvalidArgumentError("Permission", permission);
    }
    const db = await getDb();
    return db
        .run(stmt, [value, albumId, userId])
        .then(() => ShareCodes.OK);
};

async function validateAlbumExists(albumId: number) {
    try {
        await findAlbumService(albumId);
    } catch (e) {
        if (e.code === "404") {
            throw new InvalidArgumentError("Album", albumId);
        }
        throw e;
    }
}

async function validateUserExists(userId: number) {
    try {
        await findUserByIdService(userId);
    } catch (e) {
        if (e.code === "404") {
            throw new InvalidArgumentError("User", userId);
        }
        throw e;
    }
}
