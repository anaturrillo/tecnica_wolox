import {getData, getRandomPort} from "../utils/helpers";
import {Server} from "http";
import {User} from "../api/types/models";
import axios from 'axios';
import {init} from "../server";
import {config} from "../utils/config";

const checkFormatList =  (obj: any) => {
    expect(typeof obj.id).toBe("number");
    expect(typeof obj.name).toBe("string");
    expect(typeof obj.username).toBe("string");
    expect(typeof obj.email).toBe("string");
};

const checkFormatObject = (obj: any) => {
    expect.objectContaining({
        name: expect.any(String),
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String)
    })
};



describe('User endpoint test', () => {
    let port;
    let server: Server;

    beforeEach(() => {
       port = getRandomPort();
       server = init(port)
    });

    afterEach(() => {
       server.close()
    });

    it('/users should return all users', async () =>{
        const recieved: User[] = await axios.get(`${config.domain}:${port}/api/users`).then(getData);
        expect(Array.isArray(recieved)).toBe(true);
        recieved.map(checkFormatList);
    });

    it('/users/:id should return one user whit id matching the id sent in the request', async () =>{

        const recieved: User[] = await axios.get(`${config.domain}:${port}/api/users/1`).then(getData);
        expect(recieved).toHaveProperty('name');
        checkFormatObject(recieved);
    })
});