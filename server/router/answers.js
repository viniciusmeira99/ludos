const { Router } = require('express');
const { Answer } = require('../models/index');

const router = new Router();

router.post('/answers', (req, res) => {
  const { body } = req;

  return Answer.create(body)
    .then(question => res.status(201).json(question))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
