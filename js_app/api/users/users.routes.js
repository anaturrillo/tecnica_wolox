const express = require('express');
const {getAllUsers, getUser} = require('./users.controller');
const respond = require('../controller');

const router = express.Router();

router.get('/', respond(getAllUsers));
router.get('/:id', respond(getUser));

module.exports = router;

