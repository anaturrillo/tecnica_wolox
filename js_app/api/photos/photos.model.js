const client = require('./photos.client');
const {filterByValue, findValueByKeyInObject} = require('../../utils');
const photoFormat = require('../../utils/formats').photo;
const getAlbumsByUser = require('../albums/albums.model').allAlbums;

const byUser = albumId => photo => photo.albumId === albumId;

const userPhotos = (photos, userId) => {
  const userAlbums = getAlbumsByUser();

  return userAlbums.reduce((albums, userAlbums) => {

  });
};

const photo = client.getPhoto;

const allPhotos = async ({field, value}) => {

  const photos = await client.getAllPhotos();

  if ((field && !value) || (!field && value)) throw {error: 'Missing either field or value', code: 'bad_format'};

  if (field === 'userId') return userPhotos(photos, value);

  if (field && value && !findValueByKeyInObject(photoFormat, field)) throw {error: 'The property you are looking for does not exist in this resourse', code: 'bad_format'};

  const byFieldValue = filterByValue({field, value}, photoFormat);

  if (byFieldValue) {
    const response = photos.filter(byFieldValue);

    if (response.length === 0) throw {error: 'No value matched criteria', code: 'not_found'};
    return response

  } else {
    return  photos
  }
};

module.exports = {photo, allPhotos};