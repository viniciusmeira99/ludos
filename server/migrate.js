const { User, Company, Game, UsersGames } = require('./models/index');


const drop = async () => {
  await UsersGames.drop();
  await User.drop();
  await Game.drop();
  await Company.drop();
};

const create = async () => {
  await Company.sync();
  await Game.sync();
  await User.sync();
  await UsersGames.sync();
};

const dropAndCreate = () => drop().then(create);

dropAndCreate()
  .then(() => process.exit())
  .catch(console.log);

module.exports = {
  drop,
  create,
  dropAndCreate,
};