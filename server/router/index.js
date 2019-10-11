const { Router } = require('express');
const users = require('./users');
const login = require('./login');
const games = require('./games');

const router = new Router();
router.use(users);
router.use(login);
router.use(games);

module.exports = router;
