const { Router } = require('express');
const { User, Company, Game } = require('../models/index');
const { USER_IMAGE_COLUMN } = require('../constants');

const router = new Router();


router.post('/users', (req, res) => {
  const { company, ...user } = req.body;
  return Company.findOrCreate({
    where: {
      name: company,
    }
  })
    .then(([company]) => {
      return User
        .create(user)
        .then(user => company.addUsers([user]).then(user => user.save()).then((user) => {
          res.status(201).json({ id: user.id });
        }))
        .catch((err) => {
          const messages = err.errors ? err.errors.map(err => err.message) : [];
          if (messages.includes('email must be unique')) {
            res.status(400)
              .json({ errors: { email: ['E-mail já cadastrado.'] } });
            return;
          }

          res.status(400).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get('/users/:id', (req, res) => User
  .findByPk(req.params.id)
  .then(user => res.status(200).json(user.toJSON())));

router.get('/users', (req, res) => {
  const { companyId } = req.query;
  return User
    .findAll({ 
      where: { companyId },
      attributes: {
        include: [
          USER_IMAGE_COLUMN,
        ],
      }
    })
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json({ err: err.message }))
});

router.put('/users/:id', (req, res) => {
  User
    .findByPk(req.params.id)
    .then((user) => {
      user.update(req.body);
    })
    .then(() => res.status(204))
    .catch(err => res.status(400).json(err));
});

router.get('/users/:gameId/game', (req, res) => {
  const { gameId } = req.params;

  return User
    .findAll({
      include: [
        {
          model: Game,
          as: 'games',
          required: true,
          where: {
            id: gameId,
          },
        }
      ],
    })
    .then(games => res.status(200).json(games))
});

module.exports = router;