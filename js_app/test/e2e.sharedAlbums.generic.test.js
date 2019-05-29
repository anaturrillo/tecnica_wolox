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

  const defaultAlbum = {
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

  it('GET / should return shared albums list', () => {
    const ble = currentServer.dbClient;
    return client
      .put(`/`, defaultAlbum)
      .then(() => client.get(`/`))
      .then(response => {
        expect(response.status).to.be.equal(200);
        const recievedData = response.data;
        expect(recievedData).to.be.an.instanceof(Array);
        recievedData.map(e => checkFormat(sharedAlbumFormat, e));
        expect(recievedData.length).to.be.equal(1);
      })
  });

  it('GET /?field=[non existent field]&value=[value] should fail with status code 400', () => {
    return axios.get(`${config.domain}:${randomPort}/api/sharedAlbums?field=NonExistentField&value="some value"`)
      .then(e => should.fail())
      .catch(res => {
        expect(res.response.status).to.be.equal(400);
      })
  });

  it('GET /?field=[empty]&value=[value] should fail with status code 400', () => {
    return axios.get(`${config.domain}:${randomPort}/api/sharedAlbums?field=&value="some value"`)
      .then(e => should.fail())
      .catch(res => {
        expect(res.response.status).to.be.equal(400);
      })
  });

  it('GET /?field=[field]&value=[empty] should fail with status code 400', () => {
    return axios.get(`${config.domain}:${randomPort}/api/sharedAlbums?field=userId&value=`)
      .then(e => should.fail())
      .catch(res => {
        expect(res.response.status).to.be.equal(400);
      })
  });

  it('GET /?field=[field]&value=[non existent value] should fail with status code 404', () => {
    return axios.get(`${config.domain}:${randomPort}/api/sharedAlbums?field=userId&value=${Number.MAX_SAFE_INTEGER}`)
      .then(e => {
        should.fail()
      })
      .catch(res => {
        expect(res.response.status).to.be.equal(404);
      })
  });

  it('GET /[albumId] should respond with an album with matching id', function () {
    return axios
      .put(`${config.domain}:${randomPort}/api/sharedAlbums/`, defaultAlbum)
      .then(_ => axios.get(`${config.domain}:${randomPort}/api/sharedAlbums/${defaultAlbum.albumId}`))
      .then(response => {
        const recievedData = response.data;
        expect(response.status).to.be.equal(200);
        expect(recievedData._id).to.be.equal(defaultAlbum.albumId);
      })
  });

  it('GET /[non-existent-id] should respond with status code 404', function () {
    return axios.get(`${config.domain}:${randomPort}/api/sharedAlbums/${Number.MAX_SAFE_INTEGER}`)
      .then(e => {
        should.fail()
      })
      .catch(res => {
        expect(res.response.status).to.be.equal(404);
      })
  })

});
