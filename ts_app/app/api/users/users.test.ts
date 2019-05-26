import {User} from "../types/models";
import {findUserById, findAllUsers} from './users.service'
import {getUsers} from './users.client'

const defaultUsers: User[] = [
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
                lng: "81.1496"
            }
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets"
        }
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
                lng: "-34.4618"
            }
        },
        phone: "010-692-6593 x09125",
        website: "anastasia.net",
        company: {
            name: "Deckow-Crist",
            catchPhrase: "Proactive didactic contingency",
            bs: "synergize scalable supply-chains"
        }
    }
];

const mock = e => jest.fn().mockReturnValue(e);

//jest.mock('./albums.client');

it("Should return all findAllUsers", async () => {
    // @ts-ignore
    getUsers = mock(Promise.resolve(defaultUsers));

    const result = await findAllUsers();

    expect(result).toEqual(defaultUsers);
});

it("Should return the findUserById matching with a given ID", async () => {
    // @ts-ignore
    findUserById = mock(Promise.resolve(defaultUsers[0]));

    const result = await findUserById(defaultUsers[0].id);

    expect(result).toEqual(defaultUsers[0]);
});

it("Should throw not found error when id does not exists", async () => {
    // @ts-ignore
    findUserById = mock(Promise.resolve({}));

    const result = await findUserById(Number.MAX_VALUE);

    expect(result).toThrow();
});