const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBTESTDATABASE,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: 'postgres',
  },
};
