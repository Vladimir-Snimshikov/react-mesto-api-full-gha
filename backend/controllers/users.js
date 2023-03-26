const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET } = require('../config');

const ErrorCode = require('../errors/ErrorCode');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorDublicate = require('../errors/ErrorDublicate');
const ErrorAuthorized = require('../errors/ErrorAuthorized');

const { SUCCESS } = require('../utils/constans');

// GET /users
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(SUCCESS).send({ data: users }))
    .catch((err) => next(err));
};
// GET /users/:userId
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) res.status(SUCCESS).send({ data: user });
      else throw new ErrorNotFound('Пользователь по указанному _id не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorCode('Некорректный _id пользователя'));
      } else next(err);
    });
};
// GET /users/:userId
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User
    .findOne({ email }).select('+password')
    .orFail(() => {
      throw new ErrorAuthorized('Пользователь не найден');
    })
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (matched) {
        return user;
      }
      throw new ErrorAuthorized('неверный пароль');
    }))
    .then((user) => {
      const jwt = jsonwebtoken.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token: jwt });
    })
    .catch(next);
};
// GET /users/me
module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User
    .findById(_id)
    .orFail(() => {
      throw new ErrorNotFound('Пользователь не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};
// POST /signup
module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  const userObject = {
    email,
  };
  if (name) {
    userObject.name = name;
  }

  if (about) {
    userObject.about = about;
  }

  if (avatar) {
    userObject.avatar = avatar;
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      ...userObject,
      password: hash,
    }))
    .then((user) => res.status(SUCCESS).send({
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
      about: user.about,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'Error') {
        next(new ErrorCode('Переданы некорректные данные при создании пользователя'));
      } else if (err.code === 11000) {
        next(new ErrorDublicate('Пользователь с таким именеи или почтой уже существует'));
      } else next(err);
    });
};
// PATCH /users/me
module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((userData) => res.send({ data: userData }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(ErrorCode('Переданы некорректные данные при обновлении профиля'));
      } else next(err);
    });
};
// PATCH /users/me/avatar
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((userAvatar) => res.send({ data: userAvatar }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorCode('Переданы некорректные данные при обновлении аватара'));
      } else next(err);
    });
};
