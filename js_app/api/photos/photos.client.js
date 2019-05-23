const axios = require('axios');
const {getData} = require('../../utils');
const endpoint = require('./photos.endpoint');

const client = axios.create(endpoint);

const getPhoto = (id) => client.get(`/${id}`).then(getData);
const getAllPhotos = () => client.get('/').then(getData);

module.exports = {getPhoto, getAllPhotos};