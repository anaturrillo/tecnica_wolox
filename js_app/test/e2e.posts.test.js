const server = require('../server');
const config = require('../config');
const {getData, getRandomInRange, checkFormat} = require('../utils');
const axios = require('axios');
const expect = require('chai').expect;
const should = require('chai').should();
const postFormat = require('../utils/formats').post;

describe('/api/posts/', function () {
  let randomPort;
  let currentServer;
  let allItems;

  before(async () => {
    allItems = await axios.get(`${config.jsonplaceholder.domain}/posts`).then(getData)
    randomPort = getRandomInRange(1025, 65534);
    currentServer = await server.start(randomPort, config.testDb);
  });

  after(async () => {
    return new Promise(result => currentServer.app.close(result));
  });

  it('GET / should return posts list', () => {
    return axios.get(`${config.domain}:${randomPort}/api/posts`)
      .then(response => {
        expect(response.status).to.be.equal(200);
        const recievedData = response.data;
        expect(recievedData).to.be.an.instanceof(Array);
        recievedData.map(e => checkFormat(postFormat, e))
      })
  });

  it('GET /?field=userId&value=[value] should respond with posts list filtered by userId', () => {
    const value = allItems[0].userId;
    return axios.get(`${config.domain}:${randomPort}/api/posts?field=userId&value=${value}`)
      .then(response => {
        expect(response.status).to.be.equal(200);
        const recievedData = response.data;
        expect(recievedData).to.be.an.instanceof(Array);
        expect(recievedData.every(e => e.userId === value)).to.be.equal(true);
        recievedData.map(e => checkFormat(postFormat, e))
      })
  });

  it('GET /?field=title&value=[value] should respond with photos list filtered by title', () => {
    const value = allItems[0].title;
    return axios.get(`${config.domain}:${randomPort}/api/posts?field=title&value=${value}`)
      .then(response => {
        expect(response.status).to.be.equal(200);
        const recievedData = response.data;
        expect(recievedData).to.be.an.instanceof(Array);
        expect(recievedData.every(e => e.title === value)).to.be.equal(true);
        recievedData.map(e => checkFormat(postFormat, e))
      })
  });

  it('GET /?field=[non existent field]&value=[value] should failed with status code 400', () => {
    return axios.get(`${config.domain}:${randomPort}/api/posts?field=NonExistentField&value="some value"`)
      .then(e => should.fail())
      .catch(res => {
        expect(res.response.status).to.be.equal(400);
      })
  });

  it('GET /?field=[empty]&value=[value] should failed with status code 400', () => {
    return axios.get(`${config.domain}:${randomPort}/api/posts?field=&value="some value"`)
      .then(e => should.fail())
      .catch(res => {
        expect(res.response.status).to.be.equal(400);
      })
  });

  it('GET /?field=[field]&value=[empty] should failed with status code 400', () => {
    return axios.get(`${config.domain}:${randomPort}/api/posts?field=userId&value=`)
      .then(e => should.fail())
      .catch(res => {
        expect(res.response.status).to.be.equal(400);
      })
  });

  it('GET /?field=[field]&value=[non existent value] should failed with status code 404', () => {
    return axios.get(`${config.domain}:${randomPort}/api/posts?field=userId&value=${Number.MAX_SAFE_INTEGER}`)
      .then(e => {
        should.fail()
      })
      .catch(res => {
        expect(res.response.status).to.be.equal(404);
      })
  });

  it('GET /[postId] should respond with a post with matching id', function () {
    const value = allItems[0].id;
    return axios.get(`${config.domain}:${randomPort}/api/posts/${value}`)
      .then(response => {
        const recievedData = response.data;
        expect(response.status).to.be.equal(200);
        expect(recievedData.id).to.be.equal(value);

        checkFormat(postFormat, recievedData)
      })
  });

  it('GET /[non-existent-id] should respond with status code 404', function () {
    return axios.get(`${config.domain}:${randomPort}/api/posts/${Number.MAX_SAFE_INTEGER}`)
      .then(e => {
        should.fail()
      })
      .catch(res => {
        expect(res.response.status).to.be.equal(404);
      })
  })

});
