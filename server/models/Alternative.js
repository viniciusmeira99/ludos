const { STRING, BOOLEAN } = require('sequelize');
const sequelize = require('../sequelize');

const Alternative = sequelize.define('alternative', {
  description: {
    type: STRING,
    allowNull: false,
  },
  isCorrect: {
    type: BOOLEAN,
    allowNull: false,
  },
});

module.exports = Alternative;
