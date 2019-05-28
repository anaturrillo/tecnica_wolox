// jest.mock('./albums.client');

import {findUserByIdService} from "../users.service";
import {Request} from "express";
import {userController} from "../users.controller";

const mock = (e) => jest.fn().mockReturnValue(e);

it("Should parse int properly", async () => {
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


it("Should call with NaN when the value is not a number", async () => {
    const request = {
        params: {
            id: "PEPE",
        },
    } as Request;

    // @ts-ignore
    findUserByIdService = jest.fn().mockImplementation( (e) => expect(isNaN(e)).toBeTruthy());

    userController(request);

});
