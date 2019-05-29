const server = require('../server');
const config = require('../config');
const {getData, getRandomInRange, checkFormat} = require('../utils');
const axios = require('axios');
const expect = require('chai').expect;
const should = require('chai').should();
const commentsFormat = require('../utils/formats').comments;

describe('/api/comments/', function () {
  let randomPort;
  let currentServer;
  let allItems;

  before(async () => {
    allItems = await axios.get(`${config.jsonplaceholder.domain}/comments`).then(getData);
    randomPort = getRandomInRange(1025, 65534);
    currentServer = await server.start(randomPort, config.testDb);
  });

  after(async () => {
    return new Promise(result => currentServer.app.close(result));
  });

  it('GET / should return comments list', () => {
    return axios.get(`${config.domain}:${randomPort}/api/comments`)
      .then(response => {
        expect(response.status).to.be.equal(200);
        const recievedData = response.data;
        expect(recievedData).to.be.an.instanceof(Array);
        recievedData.map(e => checkFormat(commentsFormat, e))
      })
  });

  it('GET /?field=postId&value=[value] should respond with comments list filtered by postId', () => {
    const value = allItems[0].postId;
    return axios.get(`${config.domain}:${randomPort}/api/comments?field=postId&value=${value}`)
      .then(response => {
        expect(response.status).to.be.equal(200);
        const recievedData = response.data;
        expect(recievedData).to.be.an.instanceof(Array);
        expect(recievedData.every(e => e.postId === value)).to.be.equal(true);
        recievedData.map(e => checkFormat(commentsFormat, e))
      })
  });

  it('GET /?field=name&value=[value] should respond with comments list filtered by name', async () => {
    const value = allItems[0].name;

    return axios.get(`${config.domain}:${randomPort}/api/comments?field=name&value=${value}`)
      .then(response => {
        expect(response.status).to.be.equal(200);
        const recievedData = response.data;
        expect(recievedData).to.be.an.instanceof(Array);
        expect(recievedData.every(e => e.name === value)).to.be.equal(true);
        recievedData.map(e => checkFormat(commentsFormat, e))
      })
  });

  it('GET /?field=[non existent field]&value=[value] should failed with status code 400', () => {
    return axios.get(`${config.domain}:${randomPort}/api/comments?field=NonExistentField&value="some value"`)
      .then(e => should.fail())
      .catch(res => {
        expect(res.response.status).to.be.equal(400);
      })
  });

  it('GET /?field=[empty]&value=[value] should failed with status code 400', () => {
    return axios.get(`${config.domain}:${randomPort}/api/comments?field=&value="some value"`)
      .then(e => should.fail())
      .catch(res => {
        expect(res.response.status).to.be.equal(400);
      })
  });

  it('GET /?field=[field]&value=[empty] should failed with status code 400', () => {
    return axios.get(`${config.domain}:${randomPort}/api/comments?field=postId&value=`)
      .then(e => should.fail())
      .catch(res => {
        expect(res.response.status).to.be.equal(400);
      })
  });

  it('GET /?field=[field]&value=[non existent value] should failed with status code 404', () => {
    return axios.get(`${config.domain}:${randomPort}/api/comments?field=postId&value=${Number.MAX_SAFE_INTEGER}`)
      .then(e => {
        should.fail()
      })
      .catch(res => {
        expect(res.response.status).to.be.equal(404);
      })
  });

  it('GET /[commentId] should respond with comment with matching id', function () {
    const value = allItems[0].id;
    return axios.get(`${config.domain}:${randomPort}/api/comments/${value}`)
      .then(response => {
        const recievedData = response.data;
        expect(response.status).to.be.equal(200);
        expect(recievedData.id).to.be.equal(value);

        checkFormat(commentsFormat, recievedData)
      })
  });

  it('GET /[non-existent-id] should respond with status code 404', function () {
    const postId = 1;
    return axios.get(`${config.domain}:${randomPort}/api/comments/${Number.MAX_SAFE_INTEGER}`)
      .then(e => {
        should.fail()
      })
      .catch(res => {
        expect(res.response.status).to.be.equal(404);
      })
  })
});
