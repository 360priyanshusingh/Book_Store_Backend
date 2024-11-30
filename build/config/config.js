"use strict";

require('dotenv').config();
module.exports = {
  development: {
    username_db: process.env.USERNAME_DB,
    password_db: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.DIALECT
  },
  test: {
    username_db: process.env.USERNAME_DB,
    password_db: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.DIALECT
  },
  production: {
    username_db: process.env.USERNAME_DB,
    password_db: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.DIALECT
  }
};