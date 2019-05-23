const express = require('express');
const {getAllPhotos, getPhoto} = require('./photos.controller');
const respond = require('../controller');

const router = express.Router();

router.get('/', respond(getAllPhotos));
router.get('/:id', respond(getPhoto));

module.exports = router;

