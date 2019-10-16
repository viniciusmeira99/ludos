const { STRING } = require('sequelize');
const sequelize = require('../sequelize');

const Question = sequelize.define('question', {
  description: {
    type: STRING,
    allowNull: false
  },
});

module.exports = Question;
