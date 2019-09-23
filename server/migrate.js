const { User, Company, Game } = require('./models/index');


const drop = async () => {
  await User.drop();
  await Company.drop();
};

const create = async () => {
  await Company.sync();
  await User.sync();
};

const dropAndCreate = () => drop().then(create);

dropAndCreate()
  .then(() => process.exit());

module.exports = {
  drop,
  create,
  dropAndCreate,
};