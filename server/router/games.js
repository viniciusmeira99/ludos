const { Router } = require('express');
const { User, Game, Question, QuestionsGames } = require('../models/index');

const router = new Router();
const validarBodyPostGames = body => {
  const errors = {};
  if (!body.companyId) {
    errors.companyId = ['Informe a empresa'];
  }
  if (!body.name) {
    errors.name = ['Informe a nome do jogo'];
  }
  if (!body.description) {
    errors.description = ['Informe uma descrição para o jogo'];
  }
  if (!body.startDate) {
    errors.startDate = ['Data inicial é obrigatória'];
  }
  if (!body.endDate) {
    errors.endDate = ['Data final é obrigatória'];
  }
  if (!body.playersIds || !body.playersIds.length || body.playersIds === 0) {
    errors.playersIds = ['Selecione um jogador'];
  }
  return errors;
};

router.post('/games', (req, res) => {
  const { body } = req;
  const errors = validarBodyPostGames(body);
  if (Object.values(errors).length) {
    return res.status(400).json({ errors });
  }

  return Game.create(body, {
    include: [Game.QuestionsGames],
  })
    .then(game =>
      game.setPlayers(body.playersIds)
        .then(() => res.status(200).json(game.toJSON())),
    )
    .catch(err => res.status(500).json(err));
});

router.get('/games', (req, res) => {
  const { companyId } = req.query;

  return Game.findAll({
    where: { companyId },
    include: [
      {
        model: User,
        as: 'players',
      },
      Game.QuestionsGames,
    ],
  })
    .then(games => res.status(200).json(games))
    .catch(err => res.status(400).json({ err: err.message }));
});

router.delete('/games/:id', (req, res) => {
  const { id } = req.params;

  return Game.findByPk(id)
    .then(game => game.destroy())
    .then(() => res.status(204).json({}))
    .catch(err => res.status(400).json({ err: err.message }));
});

router.get('/user-games', (req, res) => {
  const a = Game.findAll({
    include: [
      {
        model: User,
        as: 'players',
        required: true,
        where: {
          id: req.query.userId,
        },
      },
    ],
  }).then(function (users) {
    res.status(200).json(users);
  });
  return a;
});

module.exports = router;
