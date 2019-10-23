const Company = require('./Company');
const Question = require('./Question');
const Alternative = require('./Alternative');
const Game = require('./Game');
const UsersGames = require('./UsersGames');
const QuestionsGames = require('./QuestionsGames');
const User = require('./User');
const Answer = require('./Answer');
const Action = require('./Action');

Company.User            = Company.hasMany(User);
Company.Game            = Company.hasMany(Game);
Company.Question        = Company.hasMany(Question);
Company.Alternative     = Company.hasMany(Alternative);
Company.Action          = Company.hasMany(Action);
Company.Answer          = Company.hasMany(Answer);

User.Company            = User.belongsTo(Company);
User.Answer             = User.hasMany(Answer);
User.Game               = User.belongsToMany(Game, { through: UsersGames, as: 'games' });

Game.User               = Game.belongsToMany(User, { through: UsersGames, as: 'players' });
Game.QuestionsGames     = Game.hasMany(QuestionsGames, { as: 'questions' });

Question.Alternative    = Question.hasMany(Alternative);
Question.QuestionsGames = Question.hasMany(QuestionsGames, { as: 'game' });

QuestionsGames.Question = QuestionsGames.belongsTo(Question);
QuestionsGames.Answer   = QuestionsGames.hasOne(Answer);

Answer.QuestionsGames   = Answer.belongsTo(QuestionsGames);
Answer.User             = Answer.belongsTo(User);
Answer.Alternative      = Answer.belongsTo(Alternative);
Answer.Game             = Answer.belongsTo(Game);

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
