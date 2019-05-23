const assert = require('assert');
const config = require('../../config');
const {getAllPhotos, getPhoto} = require('./photos.controller');
const expect = require('chai').expect;
const nock = require('nock');

const defaultPhotos = [
  {
    albumId: 1,
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952"
  },
  {
    albumId: 1,
    id: 2,
    title: "reprehenderit est deserunt velit ipsam",
    url: "https://via.placeholder.com/600/771796",
    thumbnailUrl: "https://via.placeholder.com/150/771796"
  },{
    albumId: 2,
    id: 3,
    title: "officia porro iure quia iusto qui ipsa ut modi",
    url: "https://via.placeholder.com/600/24f355",
    thumbnailUrl: "https://via.placeholder.com/150/24f355"
  },
  {
    albumId: 3,
    id: 4,
    title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
    url: "https://via.placeholder.com/600/d32776",
    thumbnailUrl: "https://via.placeholder.com/150/d32776"
  }
];
const albums = [
  {
    userId: 1,
    id: 1,
    title: "quidem molestiae enim"
  },{
    userId: 2,
    id: 2,
    title: "quidem molestiae enim"
  }, {
    userId: 1,
    id: 3,
    title: "quidem molestiae enim"
  }
];
const users = [{
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
}];

describe('Photos', function () {

  it('getAllPhotos should return user list from external service', function () {
    nock(`${config.jsonplaceholder.domain}/photos`, { allowUnmocked: true })
      .get('/')
      .reply(200, defaultPhotos);

    return getAllPhotos()
      .then(e => {
        expect(e).to.deep.equal(defaultPhotos)
      })
  });

  it('getAllPhotos should filter by title', function () {
    nock(`${config.jsonplaceholder.domain}/photos`, { allowUnmocked: true })
      .get('/')
      .reply(200,defaultPhotos);

    const mockQuery = {query: {field: 'title', value: 'officia porro iure quia iusto qui ipsa ut modi'}};

    return getAllPhotos(mockQuery)
      .then(e => {
        expect(e).to.deep.equal(defaultPhotos.filter(e => e[mockQuery.query.field] === mockQuery.query.value))
      })
  });

  it('getAllPhotos should filter by user', function () {
    nock(`${config.jsonplaceholder.domain}/photos`, { allowUnmocked: true })
      .get('/')
      .reply(200,defaultPhotos);

    const mockQuery = {query: {field: 'userId', value: '1'}};

    return getAllPhotos(mockQuery)
      .then(e => {
        expect(e).to.deep.equal(defaultPhotos.filter(e => e.albumId === 1 || e.albumId === 3))
      })
  });

  it('getPhoto should return user mathcing with given ID', function () {
    const photoId = '1';
    nock(`${config.jsonplaceholder.domain}/photos/`, { allowUnmocked: true })
      .get(`/${photoId}`)
      .reply(200, defaultPhotos.filter(e => e.id === parseInt(photoId)));

    const mockReq = {params: {id:photoId}};

    return getPhoto(mockReq)
      .then(e => {
        expect(e).to.deep.equal(defaultPhotos.filter(e => e.id === parseInt(photoId)))
      })
  });
});
