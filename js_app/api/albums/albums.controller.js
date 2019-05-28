const {album, allAlbums} = require('./albums.service');

const getAlbum = (req) => album(req.params.id);

const getAllAlbums = async (req) => {
  const field = req && req.query && req.query.field;
  const value = req && req.query && req.query.value;
  return allAlbums({field, value})
};

module.exports = {getAllAlbums, getAlbum};