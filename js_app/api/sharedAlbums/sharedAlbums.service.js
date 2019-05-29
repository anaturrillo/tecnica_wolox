const client = require('./sharedAlbums.client');
const {filterByValue, findValueByKeyInObject} = require('../../utils');
const albumFormat = require('../../utils/formats').album;
const userService = require('../users/users.service');
const {BAD_FORMAT, NOT_FOUND} = require('../../utils/codes');

const sharedAlbum = client.getSharedAlbum;

const allSharedAlbums = async (db, {field, value}) => {
  const albums = await client.getAllSharedAlbums(db);

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

const createSharedAlbumModel = async (db, sharedAlbum) => {
  const hasAlbumId = sharedAlbum && sharedAlbum.albumId;

  if (!hasAlbumId) throw  {error: 'Missing required fields', code:BAD_FORMAT};

  let newSharingUsers = [];
  if (sharedAlbum.sharingUsers) {
    newSharingUsers = sharedAlbum.sharingUsers.map(e => {
      if (!e.permissions) e.permissions = {read: true, write:false};
      return e;
    });
  }
  return client.createSharedAlbum(db, {...sharedAlbum,  sharingUsers: newSharingUsers});
};

const addAlbumUser = async (db, albumId, user) => {
  if (!albumId || !user) throw {error: 'Missing required fields', code:BAD_FORMAT};

  if (!user.permissions) {
    return client.addAlbumUser(db, albumId, {...user, permissions: {read: true, write:false}})
  }
  return client.addAlbumUser(db, albumId, user);
};

const removeAlbumUser = async (db, albumId, userId) => {
  if (!albumId || !userId) throw {error: 'Missing required fields', code:BAD_FORMAT};

  return client.removeAlbumUser(db, albumId, userId);
};

const changeAlbumUserPermissions = async(db, albumId, userId, {write, read}) => {
  return client.changeAlbumUserPermissions(db, albumId, userId, write, read);
};

const findAlbumUsers = async (db, albumId, permission) =>
  client.findAlbumUsers(db, albumId, permission)
    .then(sharingUserIds => {
      return Promise.all(sharingUserIds.map(sharingUserId => {
        return userService.user(sharingUserId);
      }))
    });


module.exports = {
  sharedAlbum,
  allSharedAlbums,
  createSharedAlbumModel,
  addAlbumUser,
  removeAlbumUser,
  changeAlbumUserPermissions,
  findAlbumUsers
};
