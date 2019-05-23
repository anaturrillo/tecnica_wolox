const assert = require('assert');
const config = require('../../config');
const {getAllUsers, getUser} = require('./users.controller');
const expect = require('chai').expect;
const nock = require('nock');

const defaultUsers = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496"
      }
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets"
    }
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618"
      }
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains"
    }
  }
];

describe('Users', function () {

  it('getAllUsers should return user list from external service', function () {
    nock(`${config.jsonplaceholder.domain}/users`, { allowUnmocked: true })
      .get('/')
      .reply(200, defaultUsers);

    return getAllUsers()
      .then(e => {
        expect(e).to.deep.equal(defaultUsers)
      })
  });

  it('getUser should return user mathcing with given ID', function () {
    const userId = '1';
    nock(`${config.jsonplaceholder.domain}/users/`, { allowUnmocked: true })
      .get(`/${userId}`)
      .reply(200, defaultUsers.filter(e => e.id === parseInt(userId)));

    const mockReq = {params: {id:userId}};

    return getUser(mockReq)
      .then(e => {
        expect(e).to.deep.equal(defaultUsers.filter(e => e.id === parseInt(userId)))
      })
  });

});