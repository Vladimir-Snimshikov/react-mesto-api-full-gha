const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const routes = require('./routes');

const { PORT, DB_ADDRESS } = require('./config');
const { ERROR_SERVER, ERROR_NOT_FOUND } = require('./errors/errorConsts');

mongoose.connect(DB_ADDRESS);

const app = express();
app.use(bodyParser.json());

app.use(routes);

app.use(errors());

app.use('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемая страница не найдена' });
});

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
  }
  next();
});

app.listen(PORT);
