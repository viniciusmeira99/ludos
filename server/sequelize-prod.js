
const { Sequelize } = require('sequelize');

const sequelizeProd = new Sequelize('ludos', 'ludos', 'uscsdevolveminhavida', {
  // host: '35.226.83.197',
  dialect: 'mysql',
  dialectOptions: {
    socketPath: '/cloudsql/ludos-node:us-central1:ludos',
    decimalNumbers: true,
  },
});

module.exports = sequelizeProd;
