const Company = require('./Company');
const Question = require('./Question');
const Alternative = require('./Alternative');
const Game = require('./Game');
const UsersGames = require('./UsersGames');
const QuestionsGames = require('./QuestionsGames');
const User = require('./User');
const Answer = require('./Answer');
const Action = require('./Action');

Company.hasMany(User);
Company.hasMany(Game);
Company.hasMany(Question);
Company.hasMany(Alternative);
Company.hasMany(Action);
Company.hasMany(Answer);

User.belongsTo(Company);

User.belongsToMany(Game, { through: UsersGames, as: 'games' });
Game.belongsToMany(User, { through: UsersGames, as: 'players' });

Game.QuestionsGames = Game.hasMany(QuestionsGames, { as: 'questions' });
Question.QuestionsGames = Question.hasMany(QuestionsGames);
QuestionsGames.belongsTo(Question);

Question.hasMany(Alternative);

Answer.belongsTo(QuestionsGames);
Answer.belongsTo(User);
Answer.belongsTo(Alternative);

module.exports = {
  Company,
  User,
  UsersGames,
  QuestionsGames,
  Game,
  Question,
  Alternative,
  Action,
  Answer,
};
