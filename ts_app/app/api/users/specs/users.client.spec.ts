import axios from "axios";
import {IUser} from "../../types/models";
import {findUser, getUsers} from "../users.client";
import {EntityNotFoundError} from "../../../utils/errors";

jest.mock("axios");

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
const BAD_ID = 0.1;

it("Should return an user", async () => {
    // @ts-ignore
    axios.get.mockResolvedValue({
       data: defaultUsers[0],
    });

    const result = await findUser(defaultUsers[0].id);

    expect(result).toEqual(defaultUsers[0]);
});

it("Should throw a EntityNotFoundError when the User id doesn't exist ", async () => {
    const expected = new EntityNotFoundError("User", BAD_ID);

    // @ts-ignore
    axios.get.mockRejectedValue({response: {status: 404}});

    try {
        await findUser(BAD_ID);
    } catch (e) {
        if (e.message !== expected.message || e.code !== expected.code) {
            throw new Error("InvalidArgumentError expected");
        }
        return;
    }
});


it("Should throw an error when the server doesn't return 404 ", async () => {
    const expected = {response: {status: 500}};

    // @ts-ignore
    axios.get.mockRejectedValue(expected);

    try {
        await findUser(BAD_ID);
    } catch (e) {
        if (e !== expected) {
            throw new Error("500 error expected");
        }
        return;
    }
});


it("Should get all users ", async () => {
    // @ts-ignore
    axios.get.mockResolvedValue({data: defaultUsers});
    const value = await getUsers();
    expect(value).toBe(defaultUsers);
});

it("Should rethrow an error when the call fails", async () => {
    const expected = new Error("500 error expected");

    // @ts-ignore
    axios.get.mockRejectedValue(expected);

    try {
        await getUsers();
    } catch (e) {
        if (e !== expected) {
            throw new Error("Expected another error");
        }
        return;
    }
});
