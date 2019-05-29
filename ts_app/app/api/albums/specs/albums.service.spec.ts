// jest.mock('./albums.client');

import {IAlbum} from "../../types/models";
import {findAlbumService, findAlbumsService} from "../albums.service";
import {findAlbum, findAlbumsByUserId, findAllAlbums} from "../albums.client";
import {InvalidArgumentError} from "../../../utils/errors";

const BAD_ID = 0.1;
const fail = () => expect(false).toBe(true);

const defaultAlbums: IAlbum[] = [
    {
        userId: 1,
        id: 1,
        title: "one",
    },
    {
        userId: 1,
        id: 2,
        title: "two",
    },
    {
        userId: 2,
        id: 2,
        title: "three",
    }];

it("GIVEN a UserId, WHEN findAlbumsService is called THEN findAlbumsByUserId SHOULD be called",
    async () => {
        const expected: IAlbum[] = defaultAlbums;

        // @ts-ignore
        findAllAlbums = jest.fn().mockImplementation(() => fail());
        // @ts-ignore
        findAlbumsByUserId = jest.fn().mockImplementation((e) => {
            expect(e).toBe(10);
            return defaultAlbums;
        });

        const response: IAlbum[] = await findAlbumsService(10);
        expect(response).toBe(expected);
        expect(findAlbumsByUserId).toBeCalledTimes(1);

    });


it("WHEN findAlbumsService is called without UserID THEN findAllAlbums SHOULD be called",
    async () => {
        const expected: IAlbum[] = defaultAlbums;

        // @ts-ignore
        findAlbumsByUserId = jest.fn().mockImplementation(() => fail());
        // @ts-ignore
        findAllAlbums = jest.fn().mockReturnValue(defaultAlbums);

        const response: IAlbum[] = await findAlbumsService(null);
        expect(response).toBe(expected);
        expect(findAllAlbums).toBeCalledTimes(1);

    });


it("GIVEN a malformed UserID WHEN findAlbumsService is called, findAllAlbums " +
    "SHOULD throw InvalidArgumentError",
    async () => {
        const expected = new InvalidArgumentError("User Id", BAD_ID);
        // @ts-ignore
        findAlbumsByUserId = jest.fn().mockImplementation(fail);
        // @ts-ignore
        findAllAlbums = jest.fn().mockReturnValue(fail);

        try {
            await findAlbumsService(BAD_ID);
        } catch (e) {
            if (e.message !== expected.message || e.code !== expected.code) {
                throw new Error("InvalidArgumentError expected");
            }
            return;
        }
    });


it("GIVEN AlbumId, WHEN findAlbumService is called, client SHOULD be called",
    async () => {
        const expected: IAlbum[] = defaultAlbums;

        // @ts-ignore
        findAlbum = jest.fn().mockReturnValue(defaultAlbums);

        const response: IAlbum[] = await findAlbumService(10);
        expect(response).toBe(expected);
        expect(findAlbum).toBeCalledTimes(1);
    });


it("GIVEN malformed UserID, WHEN findAlbumService is called it SHOULD throw InvalidArgumentError",
    async () => {
        const expected = new InvalidArgumentError("Album Id", BAD_ID);
        // @ts-ignore
        findAlbum = jest.fn().mockImplementation(fail);

        try {
            await findAlbumService(BAD_ID);
        } catch (e) {
            if (e.message !== expected.message || e.code !== expected.code) {
                throw new Error("InvalidArgumentError expected");
            }
            return;
        }
    });

