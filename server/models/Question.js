const { TEXT } = require('sequelize');
const sequelize = require('../sequelize');

const Question = sequelize.define('question', {
  description: {
    type: TEXT,
    allowNull: false
  },
});

module.exports = Question;
