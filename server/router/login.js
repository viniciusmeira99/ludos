const { Router } = require('express');
const { User } = require('../models/index');
const { USER_IMAGE_COLUMN } = require('../constants');

const router = new Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  return User
    .findOne({
      where: {
        email,
      },
      attributes: {
        include: [
          USER_IMAGE_COLUMN,
        ],
      },
      include: [
        User.Company,
      ],
    })
    .then((user) => {
      if (!user) {
        res.status(401).json({
          errors: {
            email: ['Usuário não existe.'],
          },
        });
        return;
      }

      if (user.password !== password) {
        res.status(401).json({
          errors: {
            password: ['Senha inválida.'],
          },
        });
        return;
      }
      
      return res.status(200).json({
        ...user.toJSON(),
        password: undefined,
      });
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
