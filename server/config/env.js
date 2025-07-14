const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173'
};
