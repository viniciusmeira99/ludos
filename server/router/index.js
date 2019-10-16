const { Router } = require('express');
const users = require('./users');
const login = require('./login');
const games = require('./games');
const questions = require('./questions');

const router = new Router();
router.use(users);
router.use(login);
router.use(games);
router.use(questions);

module.exports = router;
