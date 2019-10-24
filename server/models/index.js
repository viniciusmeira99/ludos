const Company = require('./Company');
const Question = require('./Question');
const Alternative = require('./Alternative');
const Game = require('./Game');
const UsersGames = require('./UsersGames');
const GameQuestion = require('./GameQuestion');
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
Game.Question           = Game.belongsToMany(Question, { through: GameQuestion, as: 'questions' });
Game.GameQuestion       = Game.hasMany(GameQuestion, { as: 'gameQuestion' });

Question.Alternative    = Question.hasMany(Alternative);
Question.Game           = Question.belongsToMany(Game, { through: GameQuestion, as: 'game' });
Question.GameQuestion   = Question.hasMany(GameQuestion, { as: 'gameQuestion' });

GameQuestion.Game       = GameQuestion.belongsTo(Game);
GameQuestion.Question   = GameQuestion.belongsTo(Question);
GameQuestion.Answer     = GameQuestion.hasOne(Answer, { foreignKey: 'gameQuestionId' });

Answer.GameQuestion     = Answer.belongsTo(GameQuestion, { foreignKey: 'gameQuestionId' });
Answer.User             = Answer.belongsTo(User);
Answer.Alternative      = Answer.belongsTo(Alternative);
Answer.Game             = Answer.belongsTo(Game);

module.exports = {
  Company,
  User,
  UsersGames,
  GameQuestion,
  Game,
  Question,
  Alternative,
  Action,
  Answer,
};
