
const Company = require('./Company');
const Game = require('./Game');
const UsersGames = require('./UsersGames');
const User = require('./User');

Company.hasMany(User);
Company.hasMany(Game);

User.belongsTo(Company);

User.belongsToMany(Game, { through: UsersGames, as: 'games' });
Game.belongsToMany(User, { through: UsersGames, as: 'players' });

module.exports = {
  Company,
  User,
  UsersGames,
  Game,
};
