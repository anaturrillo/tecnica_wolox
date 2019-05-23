const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const api = require('./api');

module.exports = {
  start: (port) => {
    app.use('/api', bodyParser.json());
    app.use('/api', bodyParser.urlencoded({extended:true}));
    app.use('/api', api());

    return app.listen(port, () => {
      console.log(`Server listening at port ${port}`)
    });
  }
};