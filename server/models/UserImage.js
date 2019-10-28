
const { BLOB } = require('sequelize');
const sequelize = require('../sequelize');

const UserImage = sequelize.define('user_image', {
  image: {
    type: BLOB('long'),
    allowNull: true,
  }
});

module.exports = UserImage;
