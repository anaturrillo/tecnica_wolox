const express = require('express');
const {users, photos, albums} = require('./routes');

module.exports = () => {
  const router = express.Router();
  router.use('/users', users);
  router.use('/photos', photos);
  router.use('/albums', albums);

  return router;
};