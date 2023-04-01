const { ERROR_SERVER } = require('../errors/errorConsts');

const handleErrors = ((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
  }
  next();
});

module.exports = handleErrors;
