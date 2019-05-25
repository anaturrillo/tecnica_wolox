const axios = require('axios');
const {getData} = require('../../utils');
const endpoint = require('./comments.endpoint');

const client = axios.create(endpoint);

const getComment = (id) => client.get(`/${id}`).then(getData);
const getAllComments = () => client.get('/').then(getData);

module.exports = {getComment, getAllComments};