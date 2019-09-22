
const Company = require('./Company');
const Game = require('./Game');
const User = require('./User');

Company.hasMany(User);
User.belongsTo(Company);

module.exports = {
  User,
  Company,
  Game,
};
