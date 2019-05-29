import {IUser} from "../../types/models";
import {findUserByIdService, findAllUsersService} from "../users.service";
import {findUser, getUsers} from "../users.client";
import {InvalidArgumentError} from "../../../utils/errors";
import {findAlbumsByUserId} from "../../albums/albums.client";

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

const mock = (e) => jest.fn().mockReturnValue(e);
const BAD_ID = 0.1;
// jest.mock('./albums.client');

it("WHEN findAllUsersService is called, getUsers SHOULD be called, and SHOULD return all users.", async () => {
    // @ts-ignore
    getUsers = mock(Promise.resolve(defaultUsers));

    const result = await findAllUsersService();

    expect(result).toEqual(defaultUsers);
    expect(getUsers).toBeCalledTimes(1);

});

it("GIVEN a UserId, " +
    "WHEN findUserByIdService is called " +
    "THEN findUser SHOULD be called and " +
    "SHOULD return user", async () => {
    // @ts-ignore
    findUser = mock(Promise.resolve(defaultUsers[0]));

    const result = await findUserByIdService(defaultUsers[0].id);

    expect(result).toEqual(defaultUsers[0]);
    expect(findUser).toBeCalledTimes(1);
});

it("GIVEN an invalis UserId, WHEN findUserByIdService SHOULD throw an InvalidArgumentError error", async () => {
    const expected = new InvalidArgumentError("User id", BAD_ID);
    try {
        await findUserByIdService(BAD_ID);
    } catch (e) {
        if (e.message !== expected.message || e.code !== expected.code) {
            throw new Error("InvalidArgumentError expected");
        }
        return;
    }
    throw new Error("Throw exception expected");
});
