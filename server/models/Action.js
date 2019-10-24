const { STRING, DECIMAL } = require('sequelize');
const sequelize = require('../sequelize');

const Action = sequelize.define('action', {
  name: {
    type: STRING,
    allowNull: false
  },
  description: {
    type: STRING,
    allowNull: false
  },
  identifier: {
    type: STRING,
    allowNull: true
  },
  score: {
    type: DECIMAL(4, 2),
    allowNull: false
  },
});

module.exports = Action;
