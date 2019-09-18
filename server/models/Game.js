const { TIME } = require('sequelize');
const sequelize = require('../sequelize');

const Game = sequelize.define('game', {
  start: {
    type: TIME,
    allowNull: false
  },
  end: {
    type: TIME,
    allowNull: false
  },
});

module.exports = Game;
