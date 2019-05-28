const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const api = require('./api');
const MongoClient = require('mongodb').MongoClient;

module.exports = {
  start: (port, dbData) => {
    app.use('/api', bodyParser.json());
    app.use('/api', bodyParser.urlencoded({extended:true}));

    return MongoClient
      .connect(`${dbData.host}:${dbData.port}`, { useNewUrlParser: true })
      .then(client => {
        const db = client.db(dbData.name);

        app.use('/api', api(db));

        return {app: app.listen(port), db, dbClient: client};
      })
      .then(({app, db, dbClient}) => {
        console.log(`Server listening at port ${port}`);
        return {app, db, dbClient}; // for testing
      });
  }
};