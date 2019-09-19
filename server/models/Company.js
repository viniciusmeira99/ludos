const { STRING } = require('sequelize');
const sequelize = require('../sequelize');

const Company = sequelize.define('company', {
  name: {
    type: STRING,
    allowNull: false
  },
});

module.exports = Company;
