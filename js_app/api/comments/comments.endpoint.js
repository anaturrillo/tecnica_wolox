const config = require('../../config');

module.exports = {
  baseURL: `${config.jsonplaceholder.domain}/comments`,
  timeout: 5000
};