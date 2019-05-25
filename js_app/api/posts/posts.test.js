const assert = require('assert');
const config = require('../../config');
const {getAllPosts, getPost} = require('./posts.controller');
const expect = require('chai').expect;
const nock = require('nock');

const defaultPosts = [
  {
    userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    userId: 2,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut"
  },
  {
    userId: 1,
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi nesciunt rem tenetur doloremque ipsam iure quis sunt voluptatem rerum illo velit"
  }
];

describe('Posts', function () {

  it('getAllPosts should return user list from external service', function () {
    nock(`${config.jsonplaceholder.domain}/posts`, { allowUnmocked: true })
      .get('/')
      .reply(200, defaultPosts);

    return getAllPosts()
      .then(e => {
        expect(e).to.deep.equal(defaultPosts)
      })
  });

  it('getAllPosts should filter by title', function () {
    nock(`${config.jsonplaceholder.domain}/posts`, { allowUnmocked: true })
      .get('/')
      .reply(200,defaultPosts);

    const mockQuery = {query: {field: 'title', value: 'eum et est occaecati'}};

    return getAllPosts(mockQuery)
      .then(e => {
        expect(e).to.deep.equal(defaultPosts.filter(e => e[mockQuery.query.field] === mockQuery.query.value))
      })
  });

  it('getAllPosts should filter by user', function () {
    nock(`${config.jsonplaceholder.domain}/posts`, { allowUnmocked: true })
      .get('/')
      .reply(200,defaultPosts);

    const mockQuery = {query: {field: 'userId', value: '1'}};

    return getAllPosts(mockQuery)
      .then(e => {
        expect(e).to.deep.equal(defaultPosts.filter(e => e[mockQuery.query.field] === parseInt(mockQuery.query.value)))
      })
  });

  it('getPost should return user mathcing with given ID', function () {
    const postId = '1';
    nock(`${config.jsonplaceholder.domain}/posts/`, { allowUnmocked: true })
      .get(`/${postId}`)
      .reply(200, defaultPosts.filter(e => e.id === parseInt(postId)));

    const mockReq = {params: {id:postId}};

    return getPost(mockReq)
      .then(e => {
        expect(e).to.deep.equal(defaultPosts.filter(e => e.id === parseInt(postId)))
      })
  });
});
