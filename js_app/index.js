const config = require('./config');
const server = require('./server');
const MongoClient = require('mongodb').MongoClient;

server.start(config.port, config.db);
