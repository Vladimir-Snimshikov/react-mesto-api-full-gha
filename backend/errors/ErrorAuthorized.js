const { ERROR_AUTHORIZED } = require('./errorConsts');

class ErrorAuthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_AUTHORIZED;
  }
}

module.exports = ErrorAuthorized;
