const SUCCESS = 200;

const checkUrl = /^(http|https):\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/;

const defaultUserName = 'Жак-Ив Кусто';
const defaultUserAbout = 'Исследователь';
const defaultUserAvatar = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';

module.exports = {
  SUCCESS,
  defaultUserName,
  defaultUserAbout,
  defaultUserAvatar,
  checkUrl,
};
