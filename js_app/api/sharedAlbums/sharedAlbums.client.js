const getSharedAlbum = (db, id) => db.collection('sharedAlbums')
  .findOne({_id: id})
  .then(e => e);

const getAllSharedAlbums = db => db.collection('sharedAlbums')
  .find({}).toArray();

const createSharedAlbum = (db, sharedAlbum) => db.collection('sharedAlbums')
    .updateOne(
      {_id: sharedAlbum.albumId},
      {$set: sharedAlbum},
      {upsert:true}
    )
    .then(res => {
      return {
        result: 'ok'
      }
    });

const addAlbumUser = (db, albumId, user) => db.collection('sharedAlbums')
  .updateOne({_id: albumId, "sharingUsers.userId": {$ne: user.userId}}, {$push: {sharingUsers: user}});

const removeAlbumUser = (db, albumId, userId) => db.collection('sharedAlbums')
  .updateOne({_id: albumId, "sharingUsers.userId": userId}, {$pull: {"sharingUsers": {"userId": userId}}});

const changeAlbumUserPermissions = (db, albumId, userId, write, read) => {
  const alter = {};
  if (write !== undefined) {
    alter["sharingUsers.$.permissions.write"] = write;
  }
  if (read !== undefined) {
    alter["sharingUsers.$.permissions.read"] = read;
  }

  return db.collection('sharedAlbums')
    .updateOne({_id: albumId, "sharingUsers.userId": userId}, {$set: alter});
};

const findAlbumUsers = (db, albumId, permission) => {
  const aggregators = [
    {$match: {_id: albumId}},
    {$unwind: "$sharingUsers"}
  ];

  if (permission) {
    aggregators.push({
      $match: {
        ["sharingUsers.permissions." + permission]: true
      }
    });
  }

  aggregators.push({$project: {_id: "$sharingUsers.userId"}});

  return db
    .collection('sharedAlbums')
    .aggregate(aggregators)
    .toArray()
    .then(res => res.map(e => e._id))
};

module.exports = {
  getSharedAlbum,
  getAllSharedAlbums,
  createSharedAlbum,
  addAlbumUser,
  removeAlbumUser,
  changeAlbumUserPermissions,
  findAlbumUsers
};
