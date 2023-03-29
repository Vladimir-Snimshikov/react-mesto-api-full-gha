const { ERROR_CODE } = require('./errorConsts');

class ErrorCode extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE;
  }
}

module.exports = ErrorCode;
