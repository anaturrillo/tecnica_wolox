import {findAlbumService, findAlbumsService} from "../../albums/albums.service";
import {
    changePermissionsForUser,
    findSharedAlbumUsersByPermissionService,
    shareAlbumWithUser,
    ShareCodes,
} from "../shared.service";
import {findUserByIdService} from "../../users/users.service";
import {permissionQuerys, shareAlbumStmt, updatePermissionStmts} from "../shared.statements";
import {getDb} from "../../db";
import {InvalidArgumentError, AppError} from "../../../utils/errors";
import {IUser} from "../../types/models";

const fail = () => expect(false).toBe(true);

const shareUser = {
    albumId: 1,
    userId: 1,
    write: true,
    read: false,
};


const defaultUsers: IUser[] = [
    {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874",
            geo: {
                lat: "-37.3159",
                lng: "81.1496",
            },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
            bs: "harness real-time e-markets",
            catchPhrase: "Multi-layered client-server neural-net",
            name: "Romaguera-Crona",
        },
    },
];

describe("shareAlbumWithUser tests", () => {
    it("GIVEN albumId, userId, write flag and read flag, " +
        "WHEN shareAlbumWithUser is called it" +
        "SHOULD save the user data and return ShareCodes.OK", async () => {
        const expected = ShareCodes.OK;
        // @ts-ignore
        findAlbumsService = jest.fn().mockImplementation((e) =>
            expect(e).toBe(shareUser.albumId),
        );

        // @ts-ignore
        findUserByIdService = jest.fn().mockImplementation((e) =>
            expect(e).toBe(shareUser.userId),
        );

        const run = jest.fn().mockImplementation((stmt, [albumId, userId, write, read]) => {
            expect(stmt).toEqual(shareAlbumStmt);
            expect(albumId).toEqual(shareUser.albumId);
            expect(userId).toEqual(shareUser.userId);
            expect(write).toEqual(shareUser.write);
            expect(read).toEqual(shareUser.read);
            return Promise.resolve();
        });

        // @ts-ignore
        getDb = jest.fn().mockImplementation(() => {
            return {
                run,
            };
        });

        const result = await shareAlbumWithUser(
            shareUser.albumId,
            shareUser.userId,
            shareUser.write,
            shareUser.read);

        expect(result).toEqual(expected);
        expect(getDb).toBeCalledTimes(1);
        expect(run).toBeCalledTimes(1);
    });


    it("GIVEN an unexistent albumId, userId, write flag and read flag," +
        "WHEN shareAlbumWithUser is called it " +
        "SHOULD throw an InvalidArgumentError", async () => {
        const expected = new InvalidArgumentError("Album", shareUser.albumId);
        // @ts-ignore
        findAlbumService = jest.fn().mockRejectedValue({code: "404"});

        // @ts-ignore
        findUserByIdService = jest.fn().mockResolvedValue((e) => e);

        // @ts-ignore
        getDb = jest.fn().mockImplementation(fail);

        try {
            await shareAlbumWithUser(
                shareUser.albumId,
                shareUser.userId,
                shareUser.write,
                shareUser.read);
            fail();
        } catch (e) {
            expect(e.message).toEqual(expected.message);
            expect(e.code).toEqual(expected.code);
        }
    });

    it("GIVEN an error getting the album, an userId, write flag and read flag," +
        "WHEN shareAlbumWithUser is called it " +
        "SHOULD throw an error", async () => {
        const expected = {code: "500"};
        // @ts-ignore
        findAlbumService = jest.fn().mockRejectedValue(expected);

        // @ts-ignore
        findUserByIdService = jest.fn().mockResolvedValue((e) => e);

        // @ts-ignore
        getDb = jest.fn().mockImplementation(fail);

        try {
            await shareAlbumWithUser(
                shareUser.albumId,
                shareUser.userId,
                shareUser.write,
                shareUser.read);
            fail();
        } catch (e) {
            expect(e).toEqual(expected);
        }
    });


    it("GIVEN an albumId, an unexistent userId, write flag and read flag," +
        "WHEN shareAlbumWithUser is called it " +
        "SHOULD throw an InvalidArgumentError", async () => {
        const expected = new InvalidArgumentError("User", shareUser.userId);
        // @ts-ignore
        findUserByIdService = jest.fn().mockRejectedValue({code: "404"});

        // @ts-ignore
        findAlbumService = jest.fn().mockImplementation((e) => e);

        // @ts-ignore
        getDb = jest.fn().mockImplementation(fail);

        try {
            await shareAlbumWithUser(
                shareUser.albumId,
                shareUser.userId,
                shareUser.write,
                shareUser.read);
            fail();
        } catch (e) {
            expect(e.message).toEqual(expected.message);
            expect(e.code).toEqual(expected.code);
        }
    });

    it("GIVEN an albumId, an error getting the user, write flag and read flag," +
        "WHEN shareAlbumWithUser is called it " +
        "SHOULD throw an error", async () => {
        const expected = {code: 500};
        // @ts-ignore
        findUserByIdService = jest.fn().mockRejectedValue(expected);

        // @ts-ignore
        findAlbumService = jest.fn().mockImplementation((e) => e);

        // @ts-ignore
        getDb = jest.fn().mockImplementation(fail);

        try {
            await shareAlbumWithUser(
                shareUser.albumId,
                shareUser.userId,
                shareUser.write,
                shareUser.read);
            fail();
        } catch (e) {
            expect(e).toEqual(expected);
        }
    });
});

describe("findSharedAlbumUsersByPermissionService tests", () => {
    it("GIVEN an albumId, permission = read, " +
        "WHEN findSharedAlbumUsersByPermissionService is called it " +
        "SHOULD throw an InvalidArgumentError", async () => {
        const permission = "read";
        const expectedStmt = permissionQuerys[permission];
        const expected = new InvalidArgumentError("Permission", permission);
        // @ts-ignore
        findAlbumService = jest.fn().mockResolvedValue();

        const all = jest.fn().mockImplementation((stmt, [albumId]) => {
            expect(stmt).toEqual(expectedStmt);
            expect(albumId).toEqual(shareUser.albumId);
            return Promise.resolve([{USER_ID: 1}]);
        });

        // @ts-ignore
        getDb = jest.fn().mockImplementation(() => {
            return {
                all,
            };
        });

        // @ts-ignore
        findUserByIdService = jest.fn().mockResolvedValue(defaultUsers[0]);

        const response = await findSharedAlbumUsersByPermissionService(
            shareUser.albumId,
            permission);

        expect(response).toEqual(defaultUsers);
        expect(findUserByIdService).toBeCalledTimes(1);
        expect(getDb).toBeCalledTimes(1);
        expect(all).toBeCalledTimes(1);
    });

    it("GIVEN an albumId, permission = write, " +
        "WHEN findSharedAlbumUsersByPermissionService is called it " +
        "SHOULD throw an InvalidArgumentError", async () => {
        const permission = "write";
        const expectedStmt = permissionQuerys[permission];
        const expected = new InvalidArgumentError("Permission", permission);
        // @ts-ignore
        findAlbumService = jest.fn().mockResolvedValue();

        const all = jest.fn().mockImplementation((stmt, [albumId]) => {
            expect(stmt).toEqual(expectedStmt);
            expect(albumId).toEqual(shareUser.albumId);
            return Promise.resolve([{USER_ID: 1}]);
        });

        // @ts-ignore
        getDb = jest.fn().mockImplementation(() => {
            return {
                all,
            };
        });

        // @ts-ignore
        findUserByIdService = jest.fn().mockResolvedValue(defaultUsers[0]);

        const response = await findSharedAlbumUsersByPermissionService(
            shareUser.albumId,
            permission);

        expect(response).toEqual(defaultUsers);
        expect(findUserByIdService).toBeCalledTimes(1);
        expect(getDb).toBeCalledTimes(1);
        expect(all).toBeCalledTimes(1);
    });

    it("GIVEN an unexistent albumId, " +
        "WHEN findSharedAlbumUsersByPermissionService is called it " +
        "SHOULD throw an InvalidArgumentError", async () => {
        const expected = new InvalidArgumentError("Album", shareUser.albumId);
        // @ts-ignore
        findAlbumService = jest.fn().mockRejectedValue({code: "404"});

        // @ts-ignore
        getDb = jest.fn().mockImplementation(fail);

        try {
            await findSharedAlbumUsersByPermissionService(
                shareUser.albumId,
                "read");
            fail();
        } catch (e) {
            expect(e.message).toEqual(expected.message);
            expect(e.code).toEqual(expected.code);
        }
    });


    it("GIVEN an albumId, an unexistent permission, " +
        "WHEN findSharedAlbumUsersByPermissionService is called it " +
        "SHOULD throw an InvalidArgumentError", async () => {
        const permission = "permission";
        const expected = new InvalidArgumentError("Permission", permission);
        // @ts-ignore
        findAlbumService = jest.fn().mockResolvedValue();

        // @ts-ignore
        getDb = jest.fn().mockImplementation(fail);

        try {
            await findSharedAlbumUsersByPermissionService(
                shareUser.albumId,
                permission);
            fail();
        } catch (e) {
            expect(e.message).toEqual(expected.message);
            expect(e.code).toEqual(expected.code);
        }
    });
});


describe("changePermissionsForUser tests", () => {
    it("GIVEN an albumId, userId, permission = read and a value, " +
        "WHEN changePermissionsForUser is called it " +
        "SHOULD save the user data and return ShareCodes.OK", async () => {
        const permission = "read";

        // This was purposefully made, to check if the value that was sent is
        // exactly the same that was recieved in the "run" function
        // tslint:disable-next-line:no-construct
        const value = new Boolean(false);

        const expected = ShareCodes.OK;
        // @ts-ignore
        findAlbumsService = jest.fn().mockImplementation((e) =>
            expect(e).toBe(shareUser.albumId),
        );

        // @ts-ignore
        findUserByIdService = jest.fn().mockImplementation((e) =>
            expect(e).toBe(shareUser.userId),
        );

        const run = jest.fn().mockImplementation((stmt, [recValue, albumId, userId]) => {
            expect(stmt).toEqual(updatePermissionStmts[permission]);
            expect(albumId).toEqual(shareUser.albumId);
            expect(userId).toEqual(shareUser.userId);
            expect(recValue).toStrictEqual(value);
            return Promise.resolve();
        });

        // @ts-ignore
        getDb = jest.fn().mockImplementation(() => {
            return {
                run,
            };
        });

        const result = await changePermissionsForUser(
            shareUser.albumId,
            shareUser.userId,
            permission,
            value as boolean);

        expect(result).toEqual(expected);
        expect(getDb).toBeCalledTimes(1);
        expect(run).toBeCalledTimes(1);
    });

    it("GIVEN an albumId, userId, permission = write and a value, " +
        "WHEN changePermissionsForUser is called it " +
        "SHOULD save the user data and return ShareCodes.OK", async () => {
        const permission = "write";

        // This was purposefully made, to check if the value that was sent is
        // exactly the same that was recieved in the "run" function
        // tslint:disable-next-line:no-construct
        const value = new Boolean(false);

        const expected = ShareCodes.OK;
        // @ts-ignore
        findAlbumsService = jest.fn().mockImplementation((e) =>
            expect(e).toBe(shareUser.albumId),
        );

        // @ts-ignore
        findUserByIdService = jest.fn().mockImplementation((e) =>
            expect(e).toBe(shareUser.userId),
        );

        const run = jest.fn().mockImplementation((stmt, [recValue, albumId, userId]) => {
            expect(stmt).toEqual(updatePermissionStmts[permission]);
            expect(albumId).toEqual(shareUser.albumId);
            expect(userId).toEqual(shareUser.userId);
            expect(recValue).toStrictEqual(value);
            return Promise.resolve();
        });

        // @ts-ignore
        getDb = jest.fn().mockImplementation(() => {
            return {
                run,
            };
        });

        const result = await changePermissionsForUser(
            shareUser.albumId,
            shareUser.userId,
            permission,
            value as boolean);

        expect(result).toEqual(expected);
        expect(getDb).toBeCalledTimes(1);
        expect(run).toBeCalledTimes(1);
    });

    it("GIVEN an albumId, userId, permission = bad and a value, " +
        "WHEN changePermissionsForUser is called " +
        "SHOULD throw an InvalidArgumentError", async () => {
        const permission = "bad";
        const expected = new InvalidArgumentError("Permission", permission);

        // @ts-ignore
        findAlbumsService = jest.fn().mockImplementation();

        // @ts-ignore
        findUserByIdService = jest.fn().mockImplementation();
        try {
            const result = await changePermissionsForUser(
                shareUser.albumId,
                shareUser.userId,
                permission,
                true);
        } catch (e) {
            expect(e.message).toEqual(expected.message);
            expect(e.code).toEqual(expected.code);
        }
    });

    it("GIVEN an unexistent albumId" +
        "WHEN changePermissionsForUser is called" +
        "SHOULD throw an InvalidArgumentError", async () => {
        const expected = new InvalidArgumentError("Album", shareUser.albumId);
        // @ts-ignore
        findAlbumService = jest.fn().mockRejectedValue({code: "404"});

        // @ts-ignore
        findUserByIdService = jest.fn().mockResolvedValue((e) => e);

        // @ts-ignore
        getDb = jest.fn().mockImplementation(fail);

        try {
            await changePermissionsForUser(
                shareUser.albumId,
                shareUser.userId,
                "read",
                true);
            fail();
        } catch (e) {
            expect(e.message).toEqual(expected.message);
            expect(e.code).toEqual(expected.code);
        }
    });


    it("GIVEN an unexistent userId " +
        "WHEN changePermissionsForUser is called" +
        "SHOULD throw an InvalidArgumentError", async () => {
        const expected = new InvalidArgumentError("User", shareUser.userId);
        // @ts-ignore
        findUserByIdService = jest.fn().mockRejectedValue({code: "404"});

        // @ts-ignore
        findAlbumService = jest.fn().mockImplementation((e) => e);

        // @ts-ignore
        getDb = jest.fn().mockImplementation(fail);

        try {
            await changePermissionsForUser(
                shareUser.albumId,
                shareUser.userId,
                "read",
                true);
            fail();
        } catch (e) {
            expect(e.message).toEqual(expected.message);
            expect(e.code).toEqual(expected.code);
        }
    });
});
