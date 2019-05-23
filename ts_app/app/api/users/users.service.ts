import {getUsers, getUser} from './users.client'

export const users = async () => await getUsers();

export const user = async (userId:number) => {
    if (!userId || isNaN(userId)) throw {error:'User id is missing or badly formatted', code:'bad_format'}
    return await getUser(userId);
};