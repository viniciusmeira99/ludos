const { User, Company, Game, UsersGames } = require('./models/index');

const drop = async () => {
  await UsersGames.drop();
  await User.drop();
  await Game.drop();
  await Company.drop();
};

const createFakeData = async () => {
  await Company.create(
    {
      name: 'Ludos',
      users: [
        {
          name: 'Vinicius',
          password: '123',
          email: 'viniciusmeira99@hotmail.com',
          phone: '11997194631',
          level: 'A',
        },
        {
          name: 'Joao',
          password: '123',
          email: 'joao@maxscalla.com.br',
          phone: '11997194631',
          level: 'U',
        },
      ],
      games: [
        {
          name: 'Fim de ano',
          description: 'Fazer o final do ano melhor',
          startDate: '2019-11-01',
          endDate: '2019-12-31',
          companyId: 1,
        },
      ],
    },
    {
      include: [User, Game],
    },
  );

  const game = await Game.create({
    name: 'Dia das crianças',
    description: 'Fazer a garotada feliz',
    startDate: '2019-10-01',
    endDate: '2019-10-12',
    companyId: 1,
  });

  await game.setPlayers([2]);
};

const create = async () => {
  await Company.sync();
  await Game.sync();
  await User.sync();
  await UsersGames.sync();
};

const migrate = () =>
  drop()
    .then(create)
    .then(createFakeData);

migrate()
  .catch(console.log)
  .then(() => process.exit());

module.exports = {
  drop,
  create,
  migrate,
};
