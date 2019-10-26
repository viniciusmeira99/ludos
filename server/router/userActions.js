const { Router } = require('express');
const { Action, UserAction } = require('../models/index');

const router = new Router();

router.get('/user-actions', (req, res) => {
  const { companyId } = req.query;
  return UserAction
    .findAll({
      where: { companyId },
      include: [
        {
          association: UserAction.User,
          attributes: ['name'],
        },
        {
          association: UserAction.Action,
          attributes: ['name'],
        },
        {
          association: UserAction.Game,
          attributes: ['name'],
        },
      ],
      order: [['createdAt', 'DESC']]
    })
    .then(action => res.status(200).json(action))
});

router.post('/user-actions', (req, res) => {
  const { userId, gameId, actionId, companyId } = req.body;
  return Action
    .findByPk(actionId)
    .then(({ score }) => (
      UserAction
        .create({
          userId,
          gameId,
          actionId,
          score,
          companyId,
        })
        .then(action => res.status(201).json(action))
    ));
});

module.exports = router;
