const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const handleErrors = require('./middlewares/handleErrors');
const { PORT, DB_ADDRESS } = require('./config');

mongoose.connect(DB_ADDRESS);

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);
app.use(errorLogger);
app.use(errors());

app.use(handleErrors);

app.listen(PORT);
