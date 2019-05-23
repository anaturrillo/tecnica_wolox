const axios = require('axios');
const {getData} = require('../../utils');
const endpoint = require('./albums.endpoint');

const client = axios.create(endpoint);

const getAlbum = (id) => client.get(`/${id}`).then(getData);
const getAllAlbums = () => client.get('/').then(getData);

module.exports = {getAlbum, getAllAlbums};