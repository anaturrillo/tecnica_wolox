const config = require('../../config');

module.exports = {
  baseURL: `${config.jsonplaceholder.domain}/users`,
  timeout: 5000
};