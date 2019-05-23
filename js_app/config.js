const dev = {
  port: 3000,
  domain: 'http://localhost',
  jsonplaceholder: {
    domain: 'https://jsonplaceholder.typicode.com'
  }
};

const prod = {

};

module.exports = process.env.ENV === 'production' ? prod : dev;