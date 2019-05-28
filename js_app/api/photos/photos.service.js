const client = require('./photos.client');
const {filterPhotos} = require("./photos.filter");
const {BAD_FORMAT} = require('../../utils/codes');

const photo = client.getPhoto;

const allPhotos = async ({field, value}) => {

  if ((field && !value) || (!field && value)) throw {error: 'Missing either field or value', code: BAD_FORMAT};

  const photos = await client.getAllPhotos();

  return filterPhotos(field, value, photos);
};

module.exports = {photo, allPhotos};