import {Request} from "express";
import {findPhotosController} from "../photos.controller";
import {findPhotosService} from "../photos.service";


it("GIVEN a number string userId and findPhotosService, " +
    "WHEN findPhotosController is called it" +
    "SHOULD call once findPhotosService and" +
    "SHOULD correctly parse userId to integer", async () => {
    const request = {
        query: {
            userId: "10",
        },
    } as Request;

    // @ts-ignore
    findPhotosService = jest.fn().mockImplementation((e) => expect(e).toBe(10));

    await findPhotosController(request);
    expect(findPhotosService).toBeCalledTimes(1);
});


it("GIVEN a string containing not a number findAllAlbumsController " +
    "SHOULD call with NaN when the value is not a number", async () => {
    const request = {
        query: {
            id: "PEPE",
        },
    } as Request;

    // @ts-ignore
    findPhotosService = jest.fn().mockImplementation((e) => expect(isNaN(e)).toBeTruthy());

    await findPhotosController(request);
    expect(findPhotosService).toBeCalledTimes(1);
});
