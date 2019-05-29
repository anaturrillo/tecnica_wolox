import {IComment} from "../../types/models";
import {InvalidArgumentError} from "../../../utils/errors";
import {findCommentsByEmail, findCommentsByName} from "../comments.client";
import {findCommentsbyQuery} from "../comments.service";

const fail = () => expect(false).toBe(true);

const defaultComments: IComment[] = [
    {
        id: 1,
        postId: 1,
        name: "lorem ipsum dolor sit amet",
        email: "jose@doe.com",
        body: "body1.1",
    },
    {
        id: 2,
        postId: 1,
        name: "oid mortales el grito",
        email: "pedro@doe.com",
        body: "thumbnailUrl2.1",
    },
    {
        id: 4,
        postId: 3,
        name: "ipsum dolor sit amet",
        email: "juan@doe.com",
        body: "body4.3",
    },
];


it("GIVEN an email and a findCommentsByEmail client." +
    "WHEN findCommentsbyQuery is called it" +
    "SHOULD return the response of findCommentsByEmail client", async () => {
    const email = "jose@doe.com";
    const expected: IComment[] = [defaultComments[0]];
    // @ts-ignore
    findCommentsByEmail = jest.fn().mockImplementation((recEmail) => {
        expect(recEmail).toBe(email);
        return [defaultComments[0]];
    });

    // @ts-ignore
    findCommentsByName = jest.fn().mockImplementation(fail);

    const result = await findCommentsbyQuery(null, email);

    expect(result).toEqual(expected);
    expect(findCommentsByEmail).toBeCalledTimes(1);
});

it("GIVEN a name and findCommentsByName client," +
    "WHEN findCommentsbyQuery is called it" +
    "SHOULD return the response of findCommentsByName client", async () => {
    const name = "oid mortales el grito";
    const expected: IComment[] = [defaultComments[1]];
    // @ts-ignore
    findCommentsByName = jest.fn().mockImplementation((recName) => {
        expect(recName).toBe(name);
        return [defaultComments[1]];
    });

    // @ts-ignore
    findCommentsByEmail = jest.fn().mockImplementation(fail);

    const result = await findCommentsbyQuery(name, null);

    expect(result).toEqual(expected);
    expect(findCommentsByName).toBeCalledTimes(1);
});

it("GIVEN a name, an email and findCommentsByEmail client." +
    "WHEN findCommentsbyQuery is called with name and email it" +
    "SHOULD return the response of findCommentsByEmail client", async () => {
    const email = "pepe@algo.com";
    const name = "oid mortales el grito";
    const expected: IComment[] = [defaultComments[0]];
    // @ts-ignore
    findCommentsByEmail = jest.fn().mockImplementation((recEmail) => {
        expect(recEmail).toBe(email);
        return [defaultComments[0]];
    });

    // @ts-ignore
    findCommentsByName = jest.fn().mockImplementation(fail);

    const result = await findCommentsbyQuery(name, email);

    expect(result).toEqual(expected);
    expect(findCommentsByEmail).toBeCalledTimes(1);
});

it("GIVEN missing query parameters and findPhotos client." +
   "WHEN findCommentsbyQuery is called it" +
   "SHOULD throw InvalidArgumentError",
    async () => {
        const expected = new InvalidArgumentError("(name OR email)", "null");
        // @ts-ignore
        findCommentsByEmail = jest.fn().mockImplementation(fail);
        // @ts-ignore
        findCommentsByName = jest.fn().mockImplementation(fail);

        try {
            await findCommentsbyQuery(null, null);
        } catch (e) {
            if (e.message !== expected.message || e.code !== expected.code) {
                throw new Error("InvalidArgumentError expected");
            }
            return;
        }
    });
