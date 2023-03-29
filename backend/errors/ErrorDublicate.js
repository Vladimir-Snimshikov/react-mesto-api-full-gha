const { ERROR_DUBLICATE } = require('./errorConsts');

class ErrorDublicate extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_DUBLICATE;
  }
}

module.exports = ErrorDublicate;
