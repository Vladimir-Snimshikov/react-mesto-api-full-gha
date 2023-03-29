const { ERROR_OWNER } = require('./errorConsts');

class ErrorOwner extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_OWNER;
  }
}

module.exports = ErrorOwner;
