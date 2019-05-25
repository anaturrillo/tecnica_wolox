const express = require('express');
const {getAllComments, getComment} = require('./comments.controller');
const respond = require('../controller');

const router = express.Router();

router.get('/', respond(getAllComments));
router.get('/:id', respond(getComment));

module.exports = router;

