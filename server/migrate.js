const { User, Company, Game } = require('./models/index');


const drop = async () => {
  await User.drop();
  await Company.drop();
};

const create = async () => {
  await Company.sync();
  User.belongsTo(Company);
  await User.sync();
};

const dropAndCreate = () => drop().then(create);

dropAndCreate().catch(console.log);

module.exports = {
  drop,
  create,
  dropAndCreate,
};