const { Router } = require('express');
const { Action, UserAction } = require('../models/index');

const router = new Router();

router.post('/user-actions', (req, res) => {
  const { userId, gameId, actionId } = req.body;
  return Action
    .findByPk(actionId)
    .then(({ score }) => (
      UserAction
        .create({
          userId,
          gameId,
          actionId,
          score,
        })
        .then(action => res.status(201).json(action))
    ));
});

module.exports = router;
