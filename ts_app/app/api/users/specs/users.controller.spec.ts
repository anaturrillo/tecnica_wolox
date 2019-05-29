// jest.mock('./albums.client');

import {findUserByIdService} from "../users.service";
import {Request} from "express";
import {userController} from "../users.controller";

const mock = (e) => jest.fn().mockReturnValue(e);

it("GIVEN a string containing a number findAllAlbumsController SHOULD parse it properly to integer", async () => {
    const request = {
        params: {
            id: "10",
        },
    } as Request;

    // @ts-ignore
    findUserByIdService = jest.fn().mockImplementation( (e) => expect(e).toBe(10));

    userController(request);
    expect(findUserByIdService).toBeCalledTimes(1);
});


it("GIVEN a string containing not a number findAllAlbumsController " +
    "SHOULD call with NaN when the value is not a number", async () => {
    const request = {
        params: {
            id: "PEPE",
        },
    } as Request;

    // @ts-ignore
    findUserByIdService = jest.fn().mockImplementation( (e) => expect(isNaN(e)).toBeTruthy());

    userController(request);

});
