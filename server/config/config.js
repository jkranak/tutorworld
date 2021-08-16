import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  "development": {
    "username": process.env.username,
    "password": process.env.password,
    "database": process.env.database,
    "host": process.env.host,
    "dialect": "postgres",
    "logging":false
  },
  "test": {
    "username": process.env.username,
    "password": process.env.password,
    "database": process.env.database,
    "host": process.env.host,
    "dialect": "postgres",
    "logging":false
  },
  "production": {
    "username": process.env.username,
    "password": process.env.password,
    "database": process.env.database,
    "host": process.env.host,
    "dialect": "postgres",
    "logging":false
  }
}

