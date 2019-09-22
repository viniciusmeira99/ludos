
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const cCA = fs.readFileSync(path.join(__dirname, './server-ca.pem'));
const cKey = fs.readFileSync(path.join(__dirname, './client-key.pem'));
const cCert = fs.readFileSync(path.join(__dirname, './client-cert.pem'));

const sequelize = new Sequelize('ludos', 'node', 'uscsdevolveminhavida', {
  host: '35.199.71.108',
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      key: cKey,
      cert: cCert,
      ca: cCA,
    },
  },
});

module.exports = sequelize;
