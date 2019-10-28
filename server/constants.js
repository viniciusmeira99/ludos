const LEVEL_MASTER = 'M';
const LEVEL_ADMIN = 'A';
const LEVEL_USER = 'U';

const USER_IMAGE_COLUMN = [
  '(SELECT CASE (SELECT 1 FROM ludos.user_images WHERE userId = user.id AND image IS NOT NULL) WHEN 1 THEN CONCAT("/users/", user.id, "/image") END)',
  'image',
];

module.exports = {
  LEVEL_ADMIN,
  LEVEL_MASTER,
  LEVEL_USER,
  USER_IMAGE_COLUMN,
};
