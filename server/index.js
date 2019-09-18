const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./router/index');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api', router);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

if (module === require.main) {
  app.listen(process.env.PORT || 8080);
}

module.exports = app;
