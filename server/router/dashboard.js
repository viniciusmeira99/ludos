const { Router } = require('express');
const { fn, col } = require('sequelize');
const { Answer, User } = require('../models/index');

const router = new Router();

router.get('/dashboard/ranking', (req, res) => {
  const { gameId } = req.query;

  return Answer.findAll({
    include: [
      {
        association: Answer.GameQuestion,
        where: gameId ? { gameId } : undefined,
        attributes: [],
      },
      {
        association: Answer.User,
        attributes: ['name'],
      },
    ],
    attributes: [
      [fn('SUM', col('answers.score')), 'score'],
    ],
    group: [[User, 'id'], [User, 'name']],
    order: [[fn('SUM', col('answers.score')), 'DESC']],
  })
    .then(games => res.status(200).json(games));
});

module.exports = router;
