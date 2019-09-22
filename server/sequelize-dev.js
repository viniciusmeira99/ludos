
const Sequelize = require('sequelize');

const sequelize = new Sequelize('ludos', 'ludos', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
