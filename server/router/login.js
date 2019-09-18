const { Router } = require('express');
const { User } = require('../models/index');

const router = new Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  return User
    .findOne({
      columns: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      where: {
        email,
      },
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

      res.status(200).json(user.toJSON());
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
