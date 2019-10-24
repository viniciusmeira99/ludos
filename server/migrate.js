const {
  User,
  Company,
  Game,
  UsersGames,
  QuestionsGames,
  Answer,
  Question,
  Alternative,
  Action
} = require('./models/index');

const { fakeQuestions, fakeGames, fakeUsers } = require('./fakeData');

const drop = async () => {
  await Answer.drop();
  await QuestionsGames.drop();
  await Alternative.drop();
  await Question.drop();
  await UsersGames.drop();
  await User.drop();
  await Game.drop();
  await Action.drop();
  await Company.drop();
};

const createFakeData = async () => {
  await Company.create({
    name: 'Ludos',
  });

  await User.bulkCreate(fakeUsers);
  await Question.bulkCreate(fakeQuestions, { include: [Alternative] });
  const games = await Game.bulkCreate(fakeGames, { include: [Game.QuestionsGames] });
  await Promise.all(games.map(game => game.setPlayers([2, 3, 4])));
};

const create = async () => {
  await Company.sync();
  await Game.sync();
  await User.sync();
  await UsersGames.sync();
  await Question.sync();
  await QuestionsGames.sync();
  await Alternative.sync();
  await Action.sync();
  await Answer.sync();
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
