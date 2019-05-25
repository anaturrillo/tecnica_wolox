const assert = require('assert');
const config = require('../../config');
const {getComment, getAllComments} = require('./comments.controller');
const expect = require('chai').expect;
const nock = require('nock');

const defaultComments = [
  {
    postId: 1,
    id: 1,
    name: "id labore ex et quam laborum",
    email: "Eliseo@gardner.biz",
    body: "laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium"
  },
  {
    postId: 1,
    id: 2,
    name: "quo vero reiciendis velit similique earum",
    email: "Jayne_Kuhic@sydney.com",
    body: "est natus enim nihil est dolore omnis voluptatem numquam et omnis occaecati quod ullam at voluptatem error expedita pariatur nihil sint nostrum voluptatem reiciendis et"
  },
  {
    postId: 1,
    id: 3,
    name: "odio adipisci rerum aut animi",
    email: "Lew@alysha.tv",
    body: "quia molestiae reprehenderit quasi aspernatur aut expedita occaecati aliquam eveniet laudantium omnis quibusdam delectus saepe quia accusamus maiores nam est cum et ducimus et vero voluptates excepturi deleniti ratione"
  },
  {
    postId: 1,
    id: 4,
    name: "alias odio sit",
    email: "Lew@alysha.tv",
    body: "non et atque occaecati deserunt quas accusantium unde odit nobis qui voluptatem quia voluptas consequuntur itaque dolor et qui rerum deleniti ut occaecati"
  }
];
const users = [{
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Lew@alysha.tv",
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


describe('Comments', function () {
  it('getAllComments should return user list from external service', function () {
    nock(`${config.jsonplaceholder.domain}/comments`, { allowUnmocked: true })
      .get('/')
      .reply(200, defaultComments);

    return getAllComments()
      .then(e => {
        expect(e).to.deep.equal(defaultComments)
      })
  });

  it('getAllComments should filter by email', function () {
    nock(`${config.jsonplaceholder.domain}/comments`, { allowUnmocked: true })
      .get('/')
      .reply(200,defaultComments);

    const mockQuery = {query: {field: 'email', value: 'Eliseo@gardner.biz'}};

    return getAllComments(mockQuery)
      .then(e => {
        expect(e).to.deep.equal(defaultComments.filter(e => e[mockQuery.query.field] === mockQuery.query.value))
      })
  });

  it('getAllComments should filter by userId', function () {

    nock(`${config.jsonplaceholder.domain}/comments`, { allowUnmocked: true })
      .get('/')
      .reply(200, defaultComments);

    nock(`${config.jsonplaceholder.domain}/users`, { allowUnmocked: true })
      .get('/1')
      .reply(200, users[0]);

    const mockQuery = {query: {field: 'userId', value: users[0].id}};

    return getAllComments(mockQuery)
      .then(e => {
        expect(e).to.deep.equal(defaultComments.filter(e => e.email === users[0].email))
      })
  });

  it('getComment should return user mathcing with given ID', function () {
    const commentId = '1';
    nock(`${config.jsonplaceholder.domain}/comments/`, { allowUnmocked: true })
      .get(`/${commentId}`)
      .reply(200, defaultComments.filter(e => e.id === parseInt(commentId)));

    const mockReq = {params: {id:commentId}};

    return getComment(mockReq)
      .then(e => {
        expect(e).to.deep.equal(defaultComments.filter(e => e.id === parseInt(commentId)))
      })
  });
});
