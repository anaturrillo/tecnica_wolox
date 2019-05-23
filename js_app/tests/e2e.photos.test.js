const server = require('../server');
const config = require('../config');
const {getData, getRandomInRange, checkFormat} = require('../utils');
const axios = require('axios');
const expect = require('chai').expect;
const should = require('chai').should();
const photoFormat = require('../utils/formats').photo;

describe('endpoint api/photos/', function () {
  let randomPort;
  let currentServer;

  beforeEach(() => {
    randomPort = getRandomInRange(1025, 65534);
    currentServer = server.start(randomPort)
  });

  afterEach(() => {
    currentServer.close()
  });

  it('should return photos list', () => {
    return axios.get(`${config.domain}:${randomPort}/api/photos`)
      .then(response => {
        expect(response.status).to.be.equal(200);
        const recievedData = response.data;
        expect(recievedData).to.be.an.instanceof(Array);
        recievedData.map(e => checkFormat(photoFormat, e))
      })
  });

  it('?field=userId&value=[value] should respond with photos list filtered by userId', () => {
    return axios.get(`${config.domain}:${randomPort}/api/photos?field=userId&value=1`)
      .then(response => {
        // TODO como testear????
      })
  });

  it('?field=albumId&value=[value] should respond with photos list filtered by albumId', () => {
    return axios.get(`${config.domain}:${randomPort}/api/photos?field=albumId&value=1`)
      .then(response => {
        expect(response.status).to.be.equal(200);
        const recievedData = response.data;
        expect(recievedData).to.be.an.instanceof(Array);
        expect(recievedData.every(e => e.albumId === 1)).to.be.equal(true);
        recievedData.map(e => checkFormat(photoFormat, e))
      })
  });

  it('?field=title&value=[value] should respond with photos list filtered by title', () => {
    return axios.get(`${config.domain}:${randomPort}/api/photos?field=title&value=accusamus beatae ad facilis cum similique qui sunt`)
      .then(response => {
        expect(response.status).to.be.equal(200);
        const recievedData = response.data;
        expect(recievedData).to.be.an.instanceof(Array);
        expect(recievedData.every(e => e.title === "accusamus beatae ad facilis cum similique qui sunt")).to.be.equal(true);
        recievedData.map(e => checkFormat(photoFormat, e))
      })
  });

  it('?field=[non existent field]&value=[value] should failed with status code 400', () => {
    return axios.get(`${config.domain}:${randomPort}/api/photos?field=NonExistentField&value="some value"`)
      .then(e => should.fail())
      .catch(res => {
        expect(res.response.status).to.be.equal(400);
      })
  });

  it('?field=[empty]&value=[value] should failed with status code 400', () => {
    return axios.get(`${config.domain}:${randomPort}/api/photos?field=&value="some value"`)
      .then(e => should.fail())
      .catch(res => {
        expect(res.response.status).to.be.equal(400);
      })
  });

  it('?field=[field]&value=[empty] should failed with status code 400', () => {
    return axios.get(`${config.domain}:${randomPort}/api/photos?field=albumId&value=`)
      .then(e => should.fail())
      .catch(res => {
        expect(res.response.status).to.be.equal(400);
      })
  });

  it('?field=[field]&value=[non existent value] should failed with status code 404', () => {
    return axios.get(`${config.domain}:${randomPort}/api/photos?field=albumId&value=999999999999999999999999`)
      .then(e => {
        should.fail()
      })
      .catch(res => {
        expect(res.response.status).to.be.equal(404);
      })
  });

  it('/:id should respond with user with matching id', function () {
    const photoId = 1;
    return axios.get(`${config.domain}:${randomPort}/api/photos/${photoId}`)
      .then(response => {
        const recievedData = response.data;
        expect(response.status).to.be.equal(200);
        expect(recievedData.id).to.be.equal(photoId);

        checkFormat(photoFormat, recievedData)
      })
  })

});