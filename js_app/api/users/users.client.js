const axios = require('axios');
const {getData} = require('../../utils');
const endpoint = require('./user.endpoint');

const client = axios.create(endpoint);

const getUser = (id) => client.get(`/${id}`).then(getData);
const getAllUsers = () => client.get('/').then(getData);

module.exports = {getUser, getAllUsers};