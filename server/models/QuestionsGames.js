const sequelize = require('../sequelize');
const { DECIMAL } = require('sequelize');

const QuestionsGames = sequelize.define('questions_games', {
  score: {
    type: DECIMAL,
    allowNull: false
  },
});

module.exports = QuestionsGames;
