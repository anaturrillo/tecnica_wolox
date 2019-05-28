import {Request} from "express";
import {findPhotosController} from "../photos.controller";
import {findPhotosService} from "../photos.service";


it("GIVEN a email, a service and findCommentsByEmail client." +
"WHEN the service is called" +
"THEN the service must return the response of findCommentsByEmail client", async () => {
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


it("Should call with NaN when the value is not a number", async () => {
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
