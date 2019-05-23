const server = require('../server');
const config = require('../config');
const {getRandomInRange, checkFormat} = require('../utils');
const axios = require('axios');
const {getData, isObjWithProps} = require('../utils');
const expect = require('chai').expect;
const userFormat = require('../utils/formats').user;

describe('endpoint api/users/', function () {
  let randomPort;
  let currentServer;

  beforeEach(() => {
    randomPort = getRandomInRange(1025, 65534);
    currentServer = server.start(randomPort)
  });

  afterEach(() => {
    currentServer.close()
  });

  it('should return users list', () => {
    return axios.get(`${config.domain}:${randomPort}/api/users`)
      .then(getData)
      .then(recieved => {
        expect(recieved).to.be.an.instanceof(Array);
        recieved.map(e => checkFormat(userFormat, e))
      })
      .catch(e => {
        console.error(e)
      })
  });

  it('/:id should return user with matching id', function () {
    const userId = 1;
    return axios.get(`${config.domain}:${randomPort}/api/users/${userId}`)
      .then(getData)
      .then(recieved => {
        expect(recieved.id).to.be.equal(userId);

        checkFormat(userFormat, recieved)
      })
  })

});