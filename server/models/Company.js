const { STRING } = require('sequelize');
const sequelize = require('../sequelize');

const Company = sequelize.define('user', {
  name: {
    type: STRING,
    allowNull: false
  },
});

// User.drop().then(() => User.sync());

module.exports = Company;
