const {filterByValue, findValueByKeyInObject} = require('../../utils');
const photoFormat = require('../../utils/formats').photo;
const albumsService = require('../albums/albums.service');
const {BAD_FORMAT, NOT_FOUND} = require('../../utils/codes');

const userPhotos = async (photos, field, value) => {
  const userAlbums = await albumsService.allAlbums({field, value});

  return userAlbums.reduce((result, album) => {
    return result.concat(photos.filter(filterByValue({field: 'albumId', value: album.id}, photoFormat)))
  }, [])
};

const filterPhotos = (field, value, photos) => {
  // Filter by User
  if (field === 'userId') return userPhotos(photos, field, value);

  // Generic filter
  if (field && value && !findValueByKeyInObject(photoFormat, field)) throw {error: 'The property you are looking for does not exist in this resourse', code: BAD_FORMAT};

  const filter = filterByValue({field, value}, photoFormat);

  if (filter) {
    const response = photos.filter(filter);

    if (response.length === 0) throw {error: 'No value matched criteria', code: NOT_FOUND};
    return response

  } else {
    return  photos
  }
};

module.exports = {
  filterPhotos
};