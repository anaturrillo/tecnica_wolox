const config = require('../../config');

module.exports = {
  baseURL: `${config.jsonplaceholder.domain}/albums`,
  timeout: 5000
};