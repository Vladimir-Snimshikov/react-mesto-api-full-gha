require('dotenv').config();

const { JWT_SECRET = 'JWT_SECRET' } = process.env;
const { PORT = '3000' } = process.env;
const { DB_ADDRESS = 'mongodb://0.0.0.0:27017/mestodb' } = process.env;
const { NODE_ENV = 'develop' } = process.env;

module.exports = {
  JWT_SECRET,
  PORT,
  DB_ADDRESS,
  NODE_ENV,
};
