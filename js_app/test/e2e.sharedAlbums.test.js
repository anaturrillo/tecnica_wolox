const server = require('../server');
const config = require('../config');
const {getData, getRandomInRange, checkFormat} = require('../utils');
const axios = require('axios');
const expect = require('chai').expect;
const should = require('chai').should();
const sharedAlbumFormat = require('../utils/formats').sharedAlbums;
const formats = require('../utils/formats');

describe('/api/sharedlbums', function () {
  let randomPort;
  let currentServer;
  let client;

  const body = {
    userId: 1,
    albumId: 1,
    sharingUsers: [
      {
        userId: 2,
        permissions: {
          read: true,
          write: true
        }
      }
    ]
  };

  before(async () => {
    randomPort = getRandomInRange(1025, 65534);
    currentServer = await server.start(randomPort, config.testDb);
    client = axios.create({
      baseURL: `${config.domain}:${randomPort}/api/sharedAlbums`,
      timeout: 5000
    })
  });

  after(async () => {
    return new Promise(resolve => currentServer.app.close(resolve));
  });

  beforeEach(async () => {
    await currentServer.db.collection("sharedAlbums").removeMany({});
  });

  it('PUT / should register new shared album', () => {
    return client.put('/', body)
      .then(response => expect(response.status).to.be.equal(200))
      .then(() => client.get('/'))
      .then(getData)
      .then(response => {
        const insertedValue = response.find(e => e.userId === 1 && e.albumId);
        expect(insertedValue).to.be.deep.equal({_id: body.albumId, ...body});
      })
  });

  it('PUT / should fail with 400 when albumId is missing', () => {
    const sharedAlbum = {
      userId: 1
    };

    return client.put('/', sharedAlbum)
      .then(_ => should.fail())
      .catch(res => {
        expect(res.response.status).to.be.equal(400);
      })
  });

  it('PUT /:albumId/users creates a user into album', () => {
    const albumId = body.albumId;
    const newUser = {
      userId: 3,
      permissions: {
        read: true,
        write: false
      }
    };

    return client.put('/', body)
      .then(_ => client.put(`/${albumId}/users/`, newUser))
      .then(_ => client.put(`/${albumId}/users/`, newUser))
      .then(_ => client.get(`/${albumId}`))
      .then(getData)
      .then(response => {
        const user = response.sharingUsers.filter(e => e.userId === newUser.userId);
        expect(user.length).to.be.equal(1);
        expect(user[0]).to.be.deep.eql(newUser);
      })
  });

  it('POST /:albumId/users/ creates a user into the album and sets default permissions when not provided', () => {
    const albumId = body.albumId;
    const newUser3 = {
      userId: 3
    };

    return client.put('/', body)
      .then(_ => client.put(`/${albumId}/users`, newUser3))
      .then(_ => client.get(`/${albumId}`))
      .then(getData)
      .then(response => {
        const newUser = response.sharingUsers.find(e => e.userId === newUser3.userId);
        expect(newUser.permissions.read).to.be.true;
        expect(newUser.permissions.write).to.be.false;
      })
  });

  it('DELETE /:albumId/users/ removes a user from the album', () => {
    const userId = 1; // el usuario con el que se compartio el album, no el dueño
    const albumId = body.albumId;
    const newUser = {
      userId: 3,
      permissions: {
        read: true,
        write: false
      }
    };

    return client.put('/', body)
      .then(_ => client.put(`/${albumId}/users`, newUser))
      .then(_ => client.delete(`/${albumId}/users/${newUser.userId}`, newUser))
      .then(_ => client.get(`/${albumId}`))
      .then(getData)
      .then(response => {
        const user = response.sharingUsers.find(e => e.userId === newUser.userId);
        expect(user).to.be.undefined;
      })
  });

  it('PATCH /:albumId/permissions allows to change permissions for a particular user', () => {
    const userIdWithPermissions = body.sharingUsers[0].userId;
    const albumId = body.albumId;

    return client.put('/', body)
      .then(_ => client.patch(`/${albumId}/users/${userIdWithPermissions}/permissions`, {write: false}))
      .then(_ => client.get(`/${albumId}`))
      .then(getData)
      .then(response => {
        const user = response.sharingUsers.find(e => e.userId === userIdWithPermissions);
        expect(user.permissions.read).to.be.true;
        expect(user.permissions.write).to.be.false;
      })
  });

  it('GET /:albumId/users/?field=read&value=true responds with a list of users with read permissions for the album',
    () => {
    const albumId = body.albumId;
    const newUser1 = {
      userId: 1,
      permissions: {
        read: false,
        write: true
      }
    };
    const newUser2 = {
      userId: 2,
      permissions: {
        read: true,
        write: true
      }
    };
    const newUser3 = {
      userId: 3,
      permissions: {
        read: true,
        write: false
      }
    };

    return client.put('/', body)
      .then(_ => client.put(`/${albumId}/users/`, newUser1))
      .then(_ => client.put(`/${albumId}/users/`, newUser2))
      .then(_ => client.put(`/${albumId}/users/`, newUser3))
      .then(_ => client.get(`/${albumId}/users?permission=read`))
      .then(getData)
      .then(response => {
        expect(response).to.be.instanceOf(Array);
        expect(response.length).to.be.equal(2);
        expect(response.every(e => e.id === 3 || e.id === 2));
        response.map(e => checkFormat(formats.user, e))

      })
  });
});
