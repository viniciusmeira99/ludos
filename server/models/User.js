const { STRING } = require('sequelize');
const sequelize = require('../sequelize');

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
});

// User.drop().then(() => User.sync());

module.exports = User;
