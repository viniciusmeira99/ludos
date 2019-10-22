const { Router } = require('express');
const { Op } = require('sequelize');
const { Company, Action } = require('../models/index');

const router = new Router();
const validarBodyPostGames = body => {
  const errors = {};
  if (!body.companyId) {
    errors.companyId = ['Informe a empresa'];
  }
  if (!body.name) {
    errors.name = ['Informe o nome da ação'];
  }
  if (!body.description) {
    errors.description = ['Informe uma descrição para a ação'];
  }
  if (!body.points) {
    errors.points = ['Informe uma pontuação para a ação'];
  }
  return errors;
};

router.post('/action', (req, res) => {
  const { body } = req;
  const errors = validarBodyPostGames(body);
  if (Object.values(errors).length) {
    return res.status(400).json({ errors });
  }

  return Action
    .create(body)
    .then(action => res.status(201).json(action))
    .catch(err => res.status(500).json(err));
});

router.get('/actions', (req, res) => {
  const { companyId } = req.query;


  return Action.findAll({
    where: { companyId }
  })
    .then(actions => res.status(200).json(actions))
    .catch(err => res.status(400).json({ err: err.message }));
});

router.delete('/actions/:id', (req, res) => {
  const { id } = req.params;

  return Action.findByPk(id)
    .then(action => action.destroy())
    .then(() => res.status(204).json({}))
    .catch(err => res.status(400).json({ err: err.message }));
});

module.exports = router;
