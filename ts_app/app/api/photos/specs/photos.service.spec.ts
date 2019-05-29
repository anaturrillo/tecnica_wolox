// jest.mock('./albums.client');

import {IAlbum, IPhoto} from "../../types/models";
import {InvalidArgumentError} from "../../../utils/errors";
import {findAllPhotos, findPhotosByAlbumId} from "../photos.client";
import {findPhotosService} from "../photos.service";
import {findAlbumsService} from "../../albums/albums.service";

const BAD_ID = 0.1;
const fail = () => expect(false).toBe(true);

const defaultPhotos: IPhoto[] = [
    {
        id: 1,
        albumId: 1,
        title: "title1.1",
        url: "url1.1",
        thumbnailUrl: "thumbnailUrl1.1",
    },
    {
        id: 2,
        albumId: 1,
        title: "title2.1",
        url: "url2.1",
        thumbnailUrl: "thumbnailUrl2.1",
    },
    {
        id: 3,
        albumId: 2,
        title: "title3.2",
        url: "url3.2",
        thumbnailUrl: "thumbnailUrl3.2",
    },
    {
        id: 4,
        albumId: 3,
        title: "title4.3",
        url: "url4.3",
        thumbnailUrl: "thumbnailUrl4.3",
    },
];
const defaultAlbums: IAlbum[] = [
    {
        userId: 2,
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
        id: 3,
        title: "three",
    }];


it("GIVEN a userId and findPhotos client, " +
    "WHEN findPhotosService is called it" +
    "SHOULD return the response of findPhotos client", async () => {
    const userId = 2;
    const albumIdsForUser = [1, 3];
    const expected: IPhoto[] = defaultPhotos
        .filter((e) => albumIdsForUser
            .some((albumIdForUser) => albumIdForUser === e.albumId) );

    // @ts-ignore
    findAlbumsService = jest.fn().mockImplementation((recUserId) => {
        expect(recUserId).toBe(userId);
        return defaultAlbums.filter((e) => e.userId === userId);
    });

    // @ts-ignore
    findPhotosByAlbumId = jest.fn().mockImplementation((albumId) => {
        expect(albumIdsForUser).toContain(albumId);
        return defaultPhotos.filter((e) => e.albumId === albumId);
    });

    // @ts-ignore
    findAllPhotos = jest.fn().mockImplementation(() => fail());

    const result = await findPhotosService(userId);

    expect(result).toEqual(expected);
    expect(findAlbumsService).toBeCalledTimes(1);
    expect(findPhotosByAlbumId).toBeCalledTimes(2);
});


it("GIVEN findPhotos client." +
    "WHEN findPhotosService is called it" +
    "SHOULD return all the photos", async () => {
    const expected: IPhoto[] = defaultPhotos;

    // @ts-ignore
    findAlbumsService = jest.fn().mockImplementation(fail);

    // @ts-ignore
    findPhotosByAlbumId = jest.fn().mockImplementation(fail);

    // @ts-ignore
    findAllPhotos = jest.fn().mockImplementation(() => defaultPhotos);

    const result = await findPhotosService();

    expect(result).toEqual(expected);
    expect(findAllPhotos).toBeCalledTimes(1);
});




it("GIVEN a malformed userId" +
    "WHEN findPhotosService is called with the malformed userId it" +
    "SHOULD throw InvalidArgumentError",
    async () => {
        const expected = new InvalidArgumentError("User Id", BAD_ID);
        // @ts-ignore
        findAlbumsService = jest.fn().mockImplementation(fail);
        // @ts-ignore
        findPhotosByAlbumId = jest.fn().mockImplementation(fail);
        // @ts-ignore
        findAllPhotos = jest.fn().mockReturnValue(fail);

        try {
            await findPhotosService(BAD_ID);
        } catch (e) {
            if (e.message !== expected.message || e.code !== expected.code) {
                throw new Error("InvalidArgumentError expected");
            }
            return;
        }
    });
