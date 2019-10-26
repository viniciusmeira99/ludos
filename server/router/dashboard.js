const { Router } = require('express');
const { literal } = require('sequelize');
const { User } = require('../models/index');
const { LEVEL_USER } = require('../constants');

const router = new Router();

router.get('/dashboard/ranking', (req, res) => {
  const { companyId, gameId } = req.query;

  const whereGameId = gameId ? ` AND gameId = ${gameId}` : '';

  return User.findAll({
    attributes: [
      'id',
      'name',
      [
        literal(`((SELECT SUM(score) FROM answers WHERE userId = user.id${whereGameId}) + (SELECT SUM(score) FROM users_actions WHERE userId = user.id${whereGameId}))`),
        'score',
      ],
    ],
    where: {
      companyId,
      level: LEVEL_USER,
    },
    group: [
      literal('1'), 
      literal('2'), 
      'name',
    ],
    order: [
      [
        literal('3'), 
        'DESC',
      ],
    ],
  })
    .then(games => res.status(200).json(games));
});

module.exports = router;
