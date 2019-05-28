const express = require('express');

const users = require('./users/users.routes');
const photos = require('./photos/photos.routes');
const albums = require('./albums/albums.routes');
const posts = require('./posts/posts.routes');
const comments = require('./comments/comments.routes');
const sharedAlbums = require('./sharedAlbums/sharedAlbums.routes');

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