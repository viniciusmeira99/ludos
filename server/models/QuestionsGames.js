const sequelize = require('../sequelize');
const { DECIMAL } = require('sequelize');

const QuestionsGames = sequelize.define('questions_games', {
  score: {
    type: DECIMAL(3, 2),
    allowNull: false
  },
});

module.exports = QuestionsGames;
