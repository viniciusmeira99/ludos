const { DATE, STRING } = require('sequelize');
const sequelize = require('../sequelize');

const Game = sequelize.define('games', {
  name: {
    type: STRING,
    allowNull: false
  },
  description: {
    type: STRING,
    allowNull: false
  },
  startDate: {
    type: DATE,
    allowNull: false
  },
  endDate: {
    type: DATE,
    allowNull: false
  },
});

module.exports = Game;
