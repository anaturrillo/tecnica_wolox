// jest.mock('./albums.client');

import {Request} from "express";
import {findAllAlbumsController} from "../albums.controller";
import {findAlbumsService} from "../albums.service";

const mock = (e) => jest.fn().mockReturnValue(e);

it("Should parse int properly", async () => {
    const request = {
        query: {
            userId: "10",
        },
    } as Request;

    // @ts-ignore
    findAlbumsService = jest.fn().mockImplementation( (e) => expect(e).toBe(10));

    await findAllAlbumsController (request);
    expect(findAlbumsService).toBeCalledTimes(1);
});


it("Should call with NaN when the value is not a number", async () => {
    const request = {
        query: {
            id: "PEPE",
        },
    } as Request;

    // @ts-ignore
    findAlbumsService = jest.fn().mockImplementation( (e) => expect(isNaN(e)).toBeTruthy());

    await findAllAlbumsController (request);
    expect(findAlbumsService).toBeCalledTimes(1);
});
