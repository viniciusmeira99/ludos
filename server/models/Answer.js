const { DECIMAL } = require('sequelize');
const sequelize = require('../sequelize');

const Answer = sequelize.define(
  'answers',
  {
    score: {
      type: DECIMAL(3, 2),
      allowNull: false
    },
  },
  // {
  //   indexes: [
  //     {
  //       unique: true,
  //       fields: ['questionsGameId', 'userId']
  //     },
  //   ],
  // },
);

module.exports = Answer;
