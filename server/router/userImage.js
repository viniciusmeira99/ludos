const { Router } = require('express');
const fileUpload = require('express-fileupload');
const { UserImage } = require('../models/index');

const router = new Router();


router.use(fileUpload());

router.post('/users/:id/image', (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
  }

  if (!req.files.image) {
    return res.status(400).json({ message: 'Nenhuma imagem enviada.' });
  }

  return UserImage
    .findOrCreate({
      where: { userId: req.params.id },
    })
    .then(([userImage]) => {
      userImage.image = req.files.image.data;
      return userImage.save();
    })
    .then(user => res.status(200).json(user.toJSON()))
    .catch(err => res.status(500).json(err))
});

router.get('/users/:id/image', (req, res) => {
  return UserImage
    .findOne({
      where: { userId: req.params.id },
      attributes: [
        'image',
      ],
    })
    .then((userImage) => {
      res.writeHead(200, {
        'Content-Length': userImage.image.length
      });
      res.end(userImage.image);
    })
    .catch(() => res.status(404).send(''));
});

module.exports = router;