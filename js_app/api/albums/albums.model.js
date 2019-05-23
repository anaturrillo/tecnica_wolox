const client = require('./albums.client');
const {filterByValue, findValueByKeyInObject} = require('../../utils');
const albumFormat = require('../../utils/formats').album;

const album = client.getAlbum;

const allAlbums = async ({field, value}) => {
  const albums = await client.getAllAlbums();

  if ((field && !value) || (!field && value)) throw {error: 'Missing either field or value', code: 'bad_format'};

  if (field && value && !findValueByKeyInObject(albumFormat, field)) throw {error: 'The property you are looking for does not exist in this resourse', code: 'bad_format'};

  const byFieldValue = filterByValue({field, value}, albumFormat);

  if (byFieldValue) {
    const response = albums.filter(byFieldValue);

    if (response.length === 0) throw {error: 'No value matched criteria', code: 'not_found'};
    return response

  } else {
    return  albums
  }
};

module.exports = {album, allAlbums};