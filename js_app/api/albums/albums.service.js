const client = require('./albums.client');
const {filterByValue, findValueByKeyInObject} = require('../../utils');
const albumFormat = require('../../utils/formats').album;
const {BAD_FORMAT, NOT_FOUND} = require('../../utils/codes');

const album = client.getAlbum;

const allAlbums = async ({field, value}) => {
  const albums = await client.getAllAlbums();

  if ((field && !value) || (!field && value)) throw {error: 'Missing either field or value', code: BAD_FORMAT};

  if (field && value && !findValueByKeyInObject(albumFormat, field))
    throw {error: 'The property you are looking for does not exist in this resourse', code: BAD_FORMAT};

  const byFieldValue = filterByValue({field, value}, albumFormat);

  if (byFieldValue) {
    const response = albums.filter(byFieldValue);

    if (response.length === 0) throw {error: 'No value matched criteria', code: NOT_FOUND};
    return response

  } else {
    return  albums
  }
};

module.exports = {album, allAlbums};