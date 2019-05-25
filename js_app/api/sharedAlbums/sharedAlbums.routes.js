const express = require('express');
const {
  getSharedAlbum,
  getAllSharedAlbums,
  createSharedAlbum,
  addAlbumUserController,
  removeAlbumUserController,
  changeAlbumUserPermissionsController,
  findAlbumUsersController
} = require('./sharedAlbums.controller');
const respond = require('../controller');

const sharedRouter = (db) => {
  const router = express.Router();

  router.get('/', respond(getAllSharedAlbums(db)));
  router.get('/:id', respond(getSharedAlbum(db)));
  router.post('/', respond(createSharedAlbum(db)));
  router.post('/:id/users', respond(addAlbumUserController(db)));
  router.delete('/:id/users/:userId', respond(removeAlbumUserController(db)));
  router.get('/:id/users', respond(findAlbumUsersController(db)));

  router.patch('/:id/users/:userId/permissions', respond(changeAlbumUserPermissionsController(db)));

  return router
};

module.exports = sharedRouter;

