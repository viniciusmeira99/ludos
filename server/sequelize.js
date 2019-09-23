const sequelize = process.env.NODE_ENV === 'production' 
  ? require('./sequelize-prod') 
  : require('./sequelize-dev');

module.exports = sequelize;
