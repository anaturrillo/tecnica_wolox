const express = require('express');
const {getPost, getAllPosts} = require('./posts.controller');
const respond = require('../controller');

const router = express.Router();

router.get('/', respond(getAllPosts));
router.get('/:id', respond(getPost));

module.exports = router;

