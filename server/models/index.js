const Company = require('./Company');
const Question = require('./Question');
const Answer = require('./Answer');
const Game = require('./Game');
const UsersGames = require('./UsersGames');
const User = require('./User');

Company.hasMany(User);
Company.hasMany(Game);
Company.hasMany(Question);
Company.hasMany(Answer);

User.belongsTo(Company);

User.belongsToMany(Game, { through: UsersGames, as: 'games' });
Game.belongsToMany(User, { through: UsersGames, as: 'players' });

Question.hasMany(Answer);

module.exports = {
  Company,
  User,
  UsersGames,
  Game,
  Question,
  Answer,
};
