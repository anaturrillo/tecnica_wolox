const server = require('../server');
const config = require('../config');
const {getRandomInRange, checkFormat} = require('../utils');
const axios = require('axios');
const {getData, isObjWithProps} = require('../utils');
const expect = require('chai').expect;
const userFormat = require('../utils/formats').user;

describe('/api/users', function () {
  let randomPort;
  let currentServer;
  let allItems;

  before(async () => {
    randomPort = getRandomInRange(1025, 65534);
    currentServer = await server.start(randomPort, config.testDb);
    allItems = await axios.get(`${config.jsonplaceholder.domain}/users`).then(getData)
  });

  after(async () => {
    return new Promise(result => currentServer.app.close(result));
  });

  it('GET / should return users list', () => {
    return axios.get(`${config.domain}:${randomPort}/api/users`)
      .then(getData)
      .then(recieved => {
        expect(recieved).to.be.an.instanceof(Array);
        recieved.map(e => checkFormat(userFormat, e))
      })
  });

  it('GET /[userId] should return user with matching id', function () {
    const value = allItems[0].id;
    return axios.get(`${config.domain}:${randomPort}/api/users/${value}`)
      .then(getData)
      .then(recieved => {
        expect(recieved.id).to.be.equal(value);

        checkFormat(userFormat, recieved)
      })
  });

  it('GET /[non-existent-id] should respond with status code 404', function () {
    return axios.get(`${config.domain}:${randomPort}/api/users/${Number.MAX_SAFE_INTEGER}`)
      .then(e => {
        should.fail()
      })
      .catch(res => {
        expect(res.response.status).to.be.equal(404);
      })
  })
});
