
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ludos', 'ludos', '', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true,
  },
});

module.exports = sequelize;
