const { Router } = require('express');
const { Question, Alternative, GameQuestion } = require('../models/index');

const router = new Router();

const validateBodyPostQuestion = body => {
  const errors = {};
  if (!body.companyId) {
    errors.companyId = ['Informe a empresa'];
  }

  if (!body.description) {
    errors.description = ['Informe a descrição da pergunta'];
  }

  if (!body.alternatives || !Array.isArray(body.alternatives)) {
    errors.alternatives = ['Informe as alternativas'];
  }

  if (Array.isArray(body.alternatives) && body.alternatives.length !== 4) {
    errors.alternatives = ['Deve conter 4 alternativas'];
  }

  if (Array.isArray(body.alternatives) && body.alternatives.filter(alternative => alternative.isCorrect).length !== 1) {
    errors.alternatives = ['Deve conter 1 alternativa correta'];
  }

  return errors;
};

router.post('/questions', (req, res) => {
  const { body } = req;

  const errors = validateBodyPostQuestion(body);
  if (Object.values(errors).length) {
    return res.status(400).json({ errors });
  }

  return Question.create(
    body,
    {
      include: [
        Alternative,
      ]
    }
  )
    .then(question => res.status(201).json(question))
    .catch(err => res.status(500).json(err));
});

router.get('/questions', (req, res) => {
  const { companyId } = req.query;

  return Question.findAll({
    where: { companyId },
    include: [
      Alternative,
    ],
  })
    .then(questions => res.status(200).json(questions))
    .catch(err => res.status(400).json({ err: err.message }));
});

router.delete('/questions/:id', (req, res) => {
  const { id } = req.params;

  return Question.findByPk(id)
    .then(question => question.destroy())
    .then(() => res.status(204).json({}))
    .catch(err => res.status(400).json({ err: err.message }));
});

router.get('/games/:gameId/questions', (req, res) => {
  const { userId } = req.query;
  const { gameId } = req.params;

  return GameQuestion
    .findAll({
      where: { gameId },
      include: [
        { association: GameQuestion.Question, include: [Alternative] },
        { association: GameQuestion.Answer, where: { userId }, required: false },
      ],
    })
    .then(games => res.status(200).json(games))
});

module.exports = router;
