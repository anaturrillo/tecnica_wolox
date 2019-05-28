const {changeAlbumUserPermissions} = require("./sharedAlbums.service");
const {removeAlbumUser} = require("./sharedAlbums.service");
const {BAD_FORMAT, NOT_FOUND} = require('../../utils/codes');

const {
  sharedAlbum,
  allSharedAlbums,
  createSharedAlbumModel,
  addAlbumUser,
  findAlbumUsers
} = require('./sharedAlbums.service');

const getSharedAlbum = db => async (req) => {
  const value = await sharedAlbum(db, parseInt(req.params.id));
  if(!value) {
    throw { error: 'Album not found', code: NOT_FOUND};
  }
  return value;
};

const getAllSharedAlbums = db => req => {
  const field = req && req.query && req.query.field;
  const value = req && req.query && req.query.value;
  return allSharedAlbums(db, {field, value})
};

const createSharedAlbum = db =>
  req => createSharedAlbumModel(db, req.body);


const addAlbumUserController = db => req => addAlbumUser(db, parseInt(req.params.id), req.body);
const removeAlbumUserController = db => req => removeAlbumUser(db, parseInt(req.params.id), parseInt(req.params.userId));
const changeAlbumUserPermissionsController = db => req => changeAlbumUserPermissions(
  db,
  parseInt(req.params.id),
  parseInt(req.params.userId),
  req.body
);

const findAlbumUsersController = db => req => findAlbumUsers(db, parseInt(req.params.id), req.query.permission);


module.exports = {
  getAllSharedAlbums,
  getSharedAlbum,
  createSharedAlbum,
  addAlbumUserController,
  removeAlbumUserController,
  changeAlbumUserPermissionsController,
  findAlbumUsersController
};