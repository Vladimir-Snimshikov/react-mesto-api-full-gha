const rateLimit = require('express-rate-limit');
const ErrorLimit = require('../errors/ErrorLimit');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // макс 150 запросов в 10 минут
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: ((req, res, next, options) => {
    if (!res.statusCode < 400) {
      next(new ErrorLimit('превышено максимальное количество запросов', options.statusCode));
    }
  }),
});

module.exports = limiter;
