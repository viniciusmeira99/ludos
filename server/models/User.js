const { STRING, ENUM } = require('sequelize');
const sequelize = require('../sequelize');

const { LEVEL_MASTER, LEVEL_ADMIN, LEVEL_USER } = require('../constants');

const User = sequelize.define('user', {
  name: {
    type: STRING,
    allowNull: false
  },
  password: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: STRING,
    allowNull: true,
  },
  level: {
    type: ENUM(LEVEL_MASTER, LEVEL_ADMIN, LEVEL_USER),
    allowNull: false,
    defaultValue: LEVEL_ADMIN,
  },
});

module.exports = User;
