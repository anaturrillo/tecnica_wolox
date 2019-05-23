const config = require('../../config');
const axios = require('axios');
const endpoint = require('./user.endpoint');
const {getData} = require('../../utils');

const client = axios.create(endpoint);

const getUser = (req) => client.get(`/${req.params.id}`).then(getData);
const getAllUsers = () => client.get('/').then(getData);

module.exports = {getAllUsers, getUser};