const {
  User,
  Company,
  Game,
  UsersGames,
  GameQuestion,
  Answer,
  Question,
  Alternative,
  Action,
  UserAction,
} = require('./models/index');

const { fakeQuestions, fakeGames, fakeUsers, fakeActions } = require('./fakeData');

const drop = async () => {
  await UserAction.drop();
  await Answer.drop();
  await GameQuestion.drop();
  await Alternative.drop();
  await UsersGames.drop();
  await User.drop();
  await Game.drop();
  await Question.drop();
  await Action.drop();
  await Company.drop();
};

const createFakeData = async () => {
  await Company.create({
    name: 'Ludos',
  });

  await User.bulkCreate(fakeUsers);
  await Question.bulkCreate(fakeQuestions, { include: [Alternative] });
  const games = await Game.bulkCreate(fakeGames, { include: [Game.GameQuestion] });
  await Promise.all(games.map(game => game.setPlayers([2, 3, 4])));
  await Action.bulkCreate(fakeActions);
};

const create = async () => {
  await Company.sync();
  await Game.sync();
  await User.sync();
  await UsersGames.sync();
  await Question.sync();
  await GameQuestion.sync();
  await Alternative.sync();
  await Action.sync();
  await Answer.sync();
  await UserAction.sync();
};

const migrate = () =>
  drop()
    .then(create)
    .then(createFakeData);

migrate()
  .catch(console.error)
  .then(() => process.exit());

module.exports = {
  drop,
  create,
  migrate,
};
