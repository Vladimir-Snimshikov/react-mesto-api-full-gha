const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { checkUrl } = require('../utils/constans');

const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const ErrorNotFound = require('../errors/ErrorNotFound');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(checkUrl),
  }),
}), createUser);

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', (req, res, next) => {
  next(new ErrorNotFound('Запрашиваемая страница не найдена'));
});

module.exports = router;
