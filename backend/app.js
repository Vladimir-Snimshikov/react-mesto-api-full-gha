const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');

const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const handleErrors = require('./middlewares/handleErrors');
const limiter = require('./middlewares/limiter');
const { PORT, DB_ADDRESS } = require('./config');

mongoose.connect(DB_ADDRESS);

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(requestLogger);
app.use(limiter);
app.use(helmet());

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
