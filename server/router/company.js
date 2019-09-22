const { Router } = require('express');
const { Company } = require('../models/index');

const router = new Router();

router.get('/company', (req, res) => {
  return Company
    .findAll()
    .then(companies => res.status(200).json(companies))
    .catch(err => res.status(400).json({ err: err.message }))
});

module.exports = router;