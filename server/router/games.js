const { Router } = require('express');
const { User, Game } = require('../models/index');

const router = new Router();
const validarBodyPostGames = (body) => {
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
  return errors;
};

router.post('/games', (req, res) => {
  const { body } = req;
  const errors = validarBodyPostGames(body);
  if (Object.values(errors).length) {
    return res.status(500).json({ errors });
  }

  return Game
    .create(body)
    .then(game => res.status(200).json(game.toJSON()))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/games/:id', (req, res) => User
  .findByPk(req.params.id)
  .then(user => res.status(200).json(user.toJSON())));

router.get('/games', (req, res) => {
  const { companyId } = req.query;
  // return res.status(500).json({companyId});
  return Game
    .findAll({ where: { companyId } })
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json({ err: err.message }))
});

router.put('/games/:id', (req, res) => {
  User
    .findByPk(req.params.id)
    .then(user => user.update(req.body))
    .then(() => res.status(204))
    .catch(err => res.status(400).json(err));
});

router.get('/user-games', (req, res) => {
  const a = Game
  .findAll({ 
    include: [{
      model: User,
      as: 'players',
      required: true,
      where: {
        id: req.query.userId
      }
    }]
  })
  .then(function(users){
    console.log(users);
    res.status(200).json(users);
  });
  return a;
  });

module.exports = router;