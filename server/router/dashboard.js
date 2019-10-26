const { Router } = require('express');
const { fn, literal } = require('sequelize');
const { User } = require('../models/index');

const router = new Router();

router.get('/dashboard/ranking', (req, res) => {
  const { companyId, gameId } = req.query;

  return User.findAll({
    attributes: [
      'id',
      'name',
      [
        fn('COALESCE', literal('COALESCE(SUM(users_actions.score), 0) + COALESCE(SUM(answers.score), 0)'), 0),
        'score',
      ],
    ],
    where: {
      companyId,
    },
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
    group: [
      'id', 
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
