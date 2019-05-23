const express = require('express');
const {getAllAlbums, getAlbum} = require('./albums.controller');
const respond = require('../controller');

const router = express.Router();

router.get('/', respond(getAllAlbums));
router.get('/:id', respond(getAlbum));

module.exports = router;

