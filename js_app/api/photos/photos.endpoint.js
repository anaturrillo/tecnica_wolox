const config = require('../../config');

module.exports = {
  baseURL: `${config.jsonplaceholder.domain}/photos`,
  timeout: 5000
};