const { ERROR_SERVER } = require('./errorConsts');

class ErrorServer extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_SERVER;
  }
}

module.exports = ErrorServer;
