const env = process.env.NODE_ENV || 'development';

const sequelize = env === 'production' 
  ? require('./sequelize-prod') 
  : require('./sequelize-dev');

module.exports = sequelize;
