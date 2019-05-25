const assert = require('assert');
const config = require('../../config');
const {getAllSharedAlbums, getSharedAlbum} = require('./sharedAlbums.controller');
const expect = require('chai').expect;
const nock = require('nock');

const defaultAlbums = [
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
  },
  {
    albumId: 1,
    id: 3,
    title: "officia porro iure quia iusto qui ipsa ut modi",
    url: "https://via.placeholder.com/600/24f355",
    thumbnailUrl: "https://via.placeholder.com/150/24f355"
  },
  {
    albumId: 1,
    id: 4,
    title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
    url: "https://via.placeholder.com/600/d32776",
    thumbnailUrl: "https://via.placeholder.com/150/d32776"
  }
];
/*
describe('Albums', function () {
  it('getAllAlbums should return user list from external service', function () {
    nock(`${config.jsonplaceholder.domain}/albums`, { allowUnmocked: true })
      .get('/')
      .reply(200, defaultAlbums);

    return getAllSharedAlbums()
      .then(e => {
        expect(e).to.deep.equal(defaultAlbums)
      })
  });

  it('getAllAlbums should filter by title', function () {
    nock(`${config.jsonplaceholder.domain}/albums`, { allowUnmocked: true })
      .get('/')
      .reply(200,defaultAlbums);

    const mockQuery = {query: {field: 'title', value: 'officia porro iure quia iusto qui ipsa ut modi'}};

    return getAllAlbums(mockQuery)
      .then(e => {
        expect(e).to.deep.equal(defaultAlbums.filter(e => e[mockQuery.query.field] === mockQuery.query.value))
      })
  });

  it('getAlbum should return user mathcing with given ID', function () {
    const albumId = '1';
    nock(`${config.jsonplaceholder.domain}/albums/`, { allowUnmocked: true })
      .get(`/${albumId}`)
      .reply(200, defaultAlbums.filter(e => e.id === parseInt(albumId)));

    const mockReq = {params: {id:albumId}};

    return getAlbum(mockReq)
      .then(e => {
        expect(e).to.deep.equal(defaultAlbums.filter(e => e.id === parseInt(albumId)))
      })
  });
});
*/