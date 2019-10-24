const sequelize = require('../sequelize');
const { DECIMAL, INTEGER } = require('sequelize');

const GameQuestion = sequelize.define('games_questions', {
  id: {
    autoIncrement: true,
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  score: {
    type: DECIMAL(3, 2),
    allowNull: false
  },
});

module.exports = GameQuestion;
