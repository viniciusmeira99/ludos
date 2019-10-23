const { Router } = require('express');
const { literal } = require('sequelize');
const { Game } = require('../models/index');

const router = new Router();

router.get('/dashboard/user-rank', (req, res) => {
  const { companyId } = req.query;

  return Game.findAll({
    where: {
      companyId,
    },
    attributes: [
      'name',
    ],
    include: [
      {
        association: Game.User,
        attributes: [
          'name',
          [literal('(SELECT SUM(score) FROM answers WHERE answers.userId = players.id AND answers.gameId = games.id)'), 'score'],
        ],
      },
    ]
  })
    .then(games => res.status(200).json(games));
});

module.exports = router;
