import {Request} from "express";
import {
    changePermissionsForUser,
    findSharedAlbumUsersByPermissionService,
    shareAlbumWithUser,
    ShareCodes,
} from "../shared.service";
import {
    changeUserPermissionsController,
    findSharedAlbumUsersByPermissionController,
    shareAlbumWithUserController,
} from "../shared.controller";
import {IUser} from "../../types/models";


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
    {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        address: {
            street: "Victor Plains",
            suite: "Suite 879",
            city: "Wisokyburgh",
            zipcode: "90566-7771",
            geo: {
                lat: "-43.9509",
                lng: "-34.4618",
            },
        },
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
        company: {
            name: "Deckow-Crist",
            catchPhrase: "Proactive didactic contingency",
            bs: "synergize scalable supply-chains",
        },
    },
];

it("GIVEN parameters and shareAlbumWithUser service." +
    "WHEN shareAlbumWithUserController is called it" +
    "SHOULD call shareAlbumWithUser service once and" +
    "SHOULD return SharedCodes.OK", async () => {
    const expected = ShareCodes.OK;
    const request = {
        params: {
            albumId: "10",
            userId: "20",
        },
        body: {
            write: true,
            read: false,
        },
    } as Request;

    // @ts-ignore
    shareAlbumWithUser = jest.fn().mockImplementation(
        (albumId, userId, write, read) => {
            expect(albumId).toBe(10);
            expect(userId).toBe(20);
            expect(write).toBe(true);
            expect(read).toBe(false);
            return Promise.resolve(ShareCodes.OK);
        },
    );

    const result = await shareAlbumWithUserController(request);
    expect(result).toEqual(expected);
    expect(shareAlbumWithUser).toBeCalledTimes(1);
});


it("GIVEN parameters and findSharedAlbumUsersByPermissionService service." +
    "WHEN findSharedAlbumUsersByPermissionController is called it" +
    "SHOULD call findSharedAlbumUsersByPermissionService service once and" +
    "SHOULD return the response of findSharedAlbumUsersByPermissionService service", async () => {
    const expected = defaultUsers;
    const request = {
        params: {
            albumId: "10",
        },
        query: {
            permission: "read",
        },
    } as Request;

    // @ts-ignore
    findSharedAlbumUsersByPermissionService = jest.fn().mockImplementation(
        (albumId, permission) => {
            expect(albumId).toBe(10);
            expect(permission).toBe("read");
            return Promise.resolve(defaultUsers);
        },
    );

    const result = await findSharedAlbumUsersByPermissionController(request);
    expect(result).toEqual(expected);
    expect(findSharedAlbumUsersByPermissionService).toBeCalledTimes(1);
});


it("GIVEN parameters and changePermissionsForUser service." +
    "WHEN changeUserPermissionsController is called it " +
    "SHOULD call changePermissionsForUser and " +
    "SHOULD return OK", async () => {
    const expected = ShareCodes.OK;
    const request = {
        params: {
            albumId: "10",
            userId: "20",
        },
        body: {
            permission: "read",
            value: true,
        },
    } as Request;

    // @ts-ignore
    changePermissionsForUser = jest.fn().mockImplementation(
        (albumId, userId, permission, value) => {
            expect(albumId).toBe(10);
            expect(userId).toBe(20);
            expect(permission).toBe("read");
            expect(value).toBe(true);
            return Promise.resolve(ShareCodes.OK);
        },
    );

    const result = await changeUserPermissionsController(request);
    expect(result).toEqual(expected);
    expect(changePermissionsForUser).toBeCalledTimes(1);
});

