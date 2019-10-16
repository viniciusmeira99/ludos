const { Router } = require('express');
const { Question, Answer } = require('../models/index');

const router = new Router();

const validateBodyPostQuestion = body => {
  const errors = {};
  if (!body.companyId) {
    errors.companyId = ['Informe a empresa'];
  }

  if (!body.description) {
    errors.description = ['Informe a descrição da pergunta'];
  }

  if (!body.answers || !Array.isArray(body.answers)) {
    errors.answers = ['Informe as respostas'];
  }

  if (Array.isArray(body.answers) && body.answers.length !== 4) {
    errors.answers = ['Deve conter 4 respostas'];
  }

  if (Array.isArray(body.answers) && body.answers.filter(answer => answer.isCorrect).length !== 1) {
    errors.answers = ['Deve conter 1 resposta correta'];
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
        Answer,
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
      Answer,
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

module.exports = router;
