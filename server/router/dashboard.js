const { Router } = require('express');
const { fn, col, literal } = require('sequelize');
const { User } = require('../models/index');

const router = new Router();

router.get('/dashboard/ranking', (req, res) => {
  const { gameId } = req.query;

  return User.findAll({
    include: [
      {
        association: User.Answer,
        attributes: [],
        where: gameId ? { gameId } : undefined,
      },
      {
        association: User.UserAction,
        attributes: [],
        where: gameId ? { gameId } : undefined,
      },
    ],
    attributes: [
      'id',
      'name',
      [
        literal('COALESCE(SUM(users_actions.score)) + COALESCE(SUM(answers.score), 0)'),
        'score',
      ],
    ],
    group: [
      'id', 
      'name',
    ],
    order: [
      [
        literal('COALESCE(COALESCE(SUM(users_actions.score)) + COALESCE(SUM(answers.score), 0), 0)'), 
        'DESC',
      ],
    ],
  })
    .then(games => res.status(200).json(games));
});

module.exports = router;
