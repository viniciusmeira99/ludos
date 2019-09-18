
const Company = require('./Company');
const Game = require('./Game');
const User = require('./User');

Company.hasMany(User);
// Company.hasMany(Game);

Company.sync();
User.sync();

module.exports = {
  User,
  Company,
  Game,
};
