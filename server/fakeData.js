const fakeUsers = [
  {
    name: 'Vinicius',
    password: '123',
    email: 'viniciusmeira99@hotmail.com',
    phone: '11997194631',
    level: 'A',
    companyId: 1,
  },
  {
    name: 'Joao',
    password: '123',
    email: 'joao@maxscalla.com.br',
    phone: '11997194631',
    level: 'U',
    companyId: 1,
  },
  {
    name: 'Geraldo',
    password: '123',
    email: 'geraldo@uscs.com.br',
    level: 'U',
    companyId: 1,
  },
  {
    name: 'Ronaldo',
    password: '123',
    email: 'ronaldo@uscs.com.br',
    level: 'U',
    companyId: 1,
  },
];

const fakeQuestions = [
  {
    companyId: 1,
    description: 'A gamificação possui muitos componentes.',
    alternatives: [
      {
        description: 'Primeira alternativa',
        isCorrect: false,
        companyId: 1,
      },
      {
        description: 'Segunda alternativa',
        isCorrect: false,
        companyId: 1,
      },
      {
        description: 'Terceira alternativa',
        isCorrect: true,
        companyId: 1,
      },
      {
        description: 'Quarta alternativa',
        isCorrect: false,
        companyId: 1,
      },
    ],
  },
  {
    companyId: 1,
    description: 'Um fabricante de equipamentos eletrônicos, pressionado pela inadimplência dos lojistas compradores de seus produtos, decide assumir o controle do seu processo logístico e chegar ao consumidor final, por meio da venda porta a porta Na situação em questão, o fabricante estará fazendo uso do sistema de venda',
    alternatives: [
      {
        companyId: 1,
        description: 'A.a varejo.',
        isCorrect: false,
      },
      {
        companyId: 1,
        description: 'B.indireta.',
        isCorrect: false,
      },
      {
        companyId: 1,
        description: 'C.direta.',
        isCorrect: false,
      },
      {
        companyId: 1,
        description: 'D.por atacado.',
        isCorrect: true,
      },
    ],
  },
  {
    companyId: 1,
    description: 'Em vendas, o conhecimento dos produtos é fundamental por permitir que:',
    alternatives: [
      {
        companyId: 1,
        description: 'A.o vendedor passe autoridade ao discorrer sobre o acúmulo de informações que ele detém;',
        isCorrect: false,
      },
      {
        companyId: 1,
        description: 'B.o comprador perceba a profundidade do conhecimento do vendedor;',
        isCorrect: false,
      },
      {
        companyId: 1,
        description: 'C.o comprador obtenha as informações técnicas que só o vendedor pode dar;',
        isCorrect: false,
      },
      {
        companyId: 1,
        description: 'D.o vendedor mostre segurança e habilidade para responder objeções;',
        isCorrect: true,
      },
    ],
  },
  {
    companyId: 1,
    description: 'Em vendas, ao apresentar um produto securitário, o assistente securitário deve:',
    alternatives: [
      {
        companyId: 1,
        description: 'A.focar na necessidade do cliente;',
        isCorrect: true,
      },
      {
        companyId: 1,
        description: 'B.deixar que o cliente controle a entrevista;',
        isCorrect: false,
      },
      {
        companyId: 1,
        description: 'C.usar linguagem culta e sofisticada para causar boa impressão;',
        isCorrect: false,
      },
      {
        companyId: 1,
        description: 'D.mostrar ao comprador o máximo de conhecimento técnico sobre o produto;',
        isCorrect: false,
      },
    ],
  },
  {
    companyId: 1,
    description: 'Francisca foi ao Shopping na semana passada para procurar um par de sapatos que combinasse com seu novo vestido. Lá, notou um display de uma meia-calça e comprou várias. Em seguida, comparou uma série de bolsas, escolheu e comprou uma. Como era quase meio-dia, comprou um refrigerante e um cachorro-quente na praça de alimentação. Finalmente, quando estava saindo, a mulher do balcão de cosméticos mostrou-lhe uma nova marca de perfume e Francisca comprou alguns. Por fim, Francisca acabou não comprando os sapatos que procurava. Analisando o miniconto, quanto aos tipos de produtos que foram comprados, é correto afirmar que para Francisca',
    alternatives: [
      {
        companyId: 1,
        description: 'A.sapato é um produto de compra comparada.',
        isCorrect: false,
      },
      {
        companyId: 1,
        description: 'B.a bolsa é um produto de conveniência.',
        isCorrect: false,
      },
      {
        companyId: 1,
        description: 'C.o refrigerante e o cachorro quente são produtos de conveniência.',
        isCorrect: true,
      },
      {
        companyId: 1,
        description: 'D.os perfumes são produtos de especialidade.',
        isCorrect: false,
      },
    ],
  },
  {
    companyId: 1,
    description: 'João Paulo é contratado por uma rede de supermercados para um importante cargo de chefia. Dentre as principais tarefas a ele atribuídas por seu chefe, está a de desenvolver ações nos processos primários da organização. Nesse sentido, caso decida seguir as ordens de seu chefe, João Paulo estará realizando ações relacionadas com',
    alternatives: [
      {
        companyId: 1,
        description: 'A.o sistema de tecnologia de informação interno.',
        isCorrect: false,
      },
      {
        companyId: 1,
        description: 'B.o controle de estoque de produtos.',
        isCorrect: false,
      },
      {
        companyId: 1,
        description: 'C.a política de remuneração variável de diretores.',
        isCorrect: false,
      },
      {
        companyId: 1,
        description: 'o serviço de atendimento de pós-venda..',
        isCorrect: true,
      },
    ],
  },
];

const fakeGames = [
  {
    name: 'Dia das crianças',
    description: 'Fazer a garotada feliz',
    startDate: '2019-10-01',
    endDate: '2019-11-11',
    companyId: 1,
    gameQuestion: [
      { questionId: 1, score: 2 },
      { questionId: 2, score: 1.5 },
      { questionId: 3, score: 1.5 },
      { questionId: 4, score: 2 },
      { questionId: 5, score: 1.5 },
      { questionId: 6, score: 1.5 },
    ],
  },
  {
    name: 'Natal',
    description: 'Aprender sobre vendas de fim de ano',
    startDate: '2019-10-01',
    endDate: '2019-11-11',
    companyId: 1,
    gameQuestion: [
      { questionId: 1, score: 1.5 },
      { questionId: 2, score: 2 },
      { questionId: 3, score: 1.5 },
      { questionId: 4, score: 1.5 },
      { questionId: 5, score: 1.5 },
      { questionId: 6, score: 2 },
    ],
  },
  {
    name: 'Fim de ano',
    description: 'Fazer o final do ano melhor',
    startDate: '2019-10-01',
    endDate: '2019-11-11',
    companyId: 1,
    gameQuestion: [
      { questionId: 1, score: 2 },
      { questionId: 2, score: 1.5 },
      { questionId: 3, score: 1.5 },
      { questionId: 4, score: 2 },
      { questionId: 5, score: 1.5 },
      { questionId: 6, score: 1.5 },
    ],
  },
];

const fakeActions = [
  {
    name: 'Efetuar venda média',
    description: 'O usuário efetuou uma venda com valor acima de R$ 500,00',
    score: 8,
    companyId: 1,
  },
  {
    name: 'Efetuar venda grande',
    description: 'O usuário efetuou uma venda com valor acima de R$ 1500,00',
    score: 20,
    companyId: 1,
  },
  {
    name: 'Atingiu a meta',
    description: 'O usuário atingiu a meta de venda do mês',
    score: 20,
    companyId: 1,
  },
];

module.exports = {
  fakeUsers,
  fakeQuestions,
  fakeGames,
  fakeActions,
};
