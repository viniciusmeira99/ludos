const { DECIMAL, INTEGER, STRING } = require('sequelize');
const sequelize = require('../sequelize');

const UserAction = sequelize.define('users_actions', {
  id: {
    autoIncrement: true,
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  score: {
    type: DECIMAL(4, 2),
    allowNull: false
  },
  identifier_value: {
    type: STRING,
    allowNull: true
  }
});

module.exports = UserAction;
