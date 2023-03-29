const jsonwebtoken = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');
const ErrorAuthorized = require('../errors/ErrorAuthorized');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    next(new ErrorAuthorized('Необходима авторизация'));
  }
  const jwt = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jsonwebtoken.verify(jwt, JWT_SECRET);
  } catch (err) {
    next(new ErrorAuthorized('Необходима авторизация'));
  }

  req.user = payload;

  next();
};

module.exports = auth;
