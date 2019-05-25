const axios = require('axios');
const {getData} = require('../../utils');
const endpoint = require('./posts.endpoint');

const client = axios.create(endpoint);

const getPost = (id) => client.get(`/${id}`).then(getData);
const getAllPosts = () => client.get('/').then(getData);

module.exports = {getPost, getAllPosts};