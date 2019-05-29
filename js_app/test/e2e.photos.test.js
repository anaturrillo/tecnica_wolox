const server = require('../server');
const config = require('../config');
const {getData, getRandomInRange, checkFormat} = require('../utils');
const axios = require('axios');
const expect = require('chai').expect;
const should = require('chai').should();
const photoFormat = require('../utils/formats').photo;

describe('/api/photos/', function () {
  let randomPort;
  let currentServer;
  let allItems;

  before(async () => {
    allItems = await axios.get(`${config.jsonplaceholder.domain}/photos`).then(getData);
    randomPort = getRandomInRange(1025, 65534);
    currentServer = await server.start(randomPort, config.testDb);
  });

  after(async () => {
    return new Promise(result => currentServer.app.close(result));
  });

  it('GET / should return photos list', () => {
    return axios.get(`${config.domain}:${randomPort}/api/photos`)
      .then(response => {
        expect(response.status).to.be.equal(200);
        const recievedData = response.data;
        expect(recievedData).to.be.an.instanceof(Array);
        recievedData.map(e => checkFormat(photoFormat, e))
      })
  });

  it('GET /?field=albumId&value=[value] should respond with photos list filtered by albumId', () => {
    const value = allItems[0].albumId;
    return axios.get(`${config.domain}:${randomPort}/api/photos?field=albumId&value=${value}`)
      .then(response => {
        expect(response.status).to.be.equal(200);
        const recievedData = response.data;
        expect(recievedData).to.be.an.instanceof(Array);
        expect(recievedData.every(e => e.albumId === value)).to.be.equal(true);
        recievedData.map(e => checkFormat(photoFormat, e))
      })
  });

  it('GET /?field=title&value=[value] should respond with photos list filtered by title', () => {
    const value = allItems[0].title;
    return axios.get(`${config.domain}:${randomPort}/api/photos?field=title&value=${value}`)
      .then(response => {
        expect(response.status).to.be.equal(200);
        const recievedData = response.data;
        expect(recievedData).to.be.an.instanceof(Array);
        expect(recievedData.every(e => e.title === value)).to.be.equal(true);
        recievedData.map(e => checkFormat(photoFormat, e))
      })
  });

  it('GET /?field=[non existent field]&value=[value] should failed with status code 400', () => {
    return axios.get(`${config.domain}:${randomPort}/api/photos?field=NonExistentField&value="some value"`)
      .then(e => should.fail())
      .catch(res => {
        expect(res.response.status).to.be.equal(400);
      })
  });

  it('GET /?field=[empty]&value=[value] should failed with status code 400', () => {
    return axios.get(`${config.domain}:${randomPort}/api/photos?field=&value="some value"`)
      .then(e => should.fail())
      .catch(res => {
        expect(res.response.status).to.be.equal(400);
      })
  });

  it('GET /?field=[field]&value=[empty] should failed with status code 400', () => {
    return axios.get(`${config.domain}:${randomPort}/api/photos?field=albumId&value=`)
      .then(e => should.fail())
      .catch(res => {
        expect(res.response.status).to.be.equal(400);
      })
  });

  it('GET /?field=[field]&value=[non existent value] should failed with status code 404', () => {
    return axios.get(`${config.domain}:${randomPort}/api/photos?field=albumId&value=${Number.MAX_SAFE_INTEGER}`)
      .then(e => {
        should.fail()
      })
      .catch(res => {
        expect(res.response.status).to.be.equal(404);
      })
  });

  it('GET /[photoId] should respond with photo a with matching id', function () {
    const value = allItems[0].albumId;
    return axios.get(`${config.domain}:${randomPort}/api/photos/${value}`)
      .then(response => {
        const recievedData = response.data;
        expect(response.status).to.be.equal(200);
        expect(recievedData.id).to.be.equal(value);

        checkFormat(photoFormat, recievedData)
      })
  });

  it('GET /[non-existent-id ]should respond with status code 404', function () {
    const albumId = 1;
    return axios.get(`${config.domain}:${randomPort}/api/photos/${Number.MAX_SAFE_INTEGER}`)
      .then(e => {
        should.fail()
      })
      .catch(res => {
        expect(res.response.status).to.be.equal(404);
      })
  })
});
