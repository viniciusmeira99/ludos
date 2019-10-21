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
  const company = await Company.create(
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
      include: [
        User,
        Game,
      ],
    },
  );

  Question.bulkCreate([
    {
      companyId: company.id,
      description: 'A gamificação possui muitos componentes.',
      alternatives: [
        {
          description: 'Primeira alternativa',
          isCorrect: false,
          companyId: company.id,
        },
        {
          description: 'Segunda alternativa',
          isCorrect: false,
          companyId: company.id,
        },
        {
          description: 'Terceira alternativa',
          isCorrect: true,
          companyId: company.id,
        },
        {
          description: 'Quarta alternativa',
          isCorrect: false,
          companyId: company.id,
        },
      ],
    }
  ], { include: [Alternative] });


  const game = await Game.create({
    name: 'Dia das crianças',
    description: 'Fazer a garotada feliz',
    startDate: '2019-10-01',
    endDate: '2019-11-11',
    companyId: 1,
    questions: [{ questionId: 1, score: 1.5 }],
  }, {
    include: [Game.QuestionsGames]
  });

  await game.setPlayers([2]);
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
