const { Router } = require('express');
const users = require('./users');
const login = require('./login');

const router = new Router();
router.use(users);
router.use(login);

module.exports = router;
