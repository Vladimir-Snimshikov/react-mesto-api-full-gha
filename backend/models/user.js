const mongoose = require('mongoose');
const validator = require('validator');

const {
  defaultUserName,
  defaultUserAbout,
  defaultUserAvatar,
} = require('../utils/constans');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: defaultUserName,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: defaultUserAbout,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: defaultUserAvatar,
    validate: {
      validator(v) {
        return /^(http|https):\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Поле "email" должно быть валидным email-адресом',
    },
    index: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
userSchema.set('autoIndex', true);

module.exports = mongoose.model('User', userSchema);
