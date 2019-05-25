const dev = {
  port: 3000,
  domain: 'http://localhost',
  jsonplaceholder: {
    domain: 'https://jsonplaceholder.typicode.com'
  },
  db:{
    host:'mongodb://localhost',
    port: '27017',
    name: 'photoSharing-dev'
  },
  testDb: {
    host:'mongodb://localhost',
    port: '27017',
    name: 'photoSharing-test'
  }
};

const prod = {

};

module.exports = process.env.ENV === 'production' ? prod : dev;