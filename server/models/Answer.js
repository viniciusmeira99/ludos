const { STRING, BOOLEAN } = require('sequelize');
const sequelize = require('../sequelize');

const Answer = sequelize.define('answer', {
  description: {
    type: STRING,
    allowNull: false,
  },
  isCorrect: {
    type: BOOLEAN,
    allowNull: false,
  },
});

module.exports = Answer;
