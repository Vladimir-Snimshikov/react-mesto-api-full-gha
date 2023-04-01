const SUCCESS = 200;

const checkUrl = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

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
