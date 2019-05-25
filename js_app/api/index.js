const express = require('express');
const {users, photos, albums, posts, comments, sharedAlbums} = require('./routes');

module.exports = (db) => {
  const router = express.Router();
  router.use('/users', users);
  router.use('/photos', photos);
  router.use('/albums', albums);
  router.use ('/posts', posts);
  router.use('/comments', comments);
  router.use('/sharedAlbums', sharedAlbums(db));

  return router;
};