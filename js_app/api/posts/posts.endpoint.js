const config = require('../../config');

module.exports = {
  baseURL: `${config.jsonplaceholder.domain}/posts`,
  timeout: 5000
};