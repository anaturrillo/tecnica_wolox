const {photo, allPhotos} = require('./photos.service');

const getPhoto = (req) => photo(req.params.id);

const getAllPhotos = async (req) => {
  const field = req && req.query && req.query.field;
  const value = req && req.query && req.query.value;
  return allPhotos({field, value})
};

module.exports = {getAllPhotos, getPhoto};