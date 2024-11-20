import Sequelize from 'sequelize';
import logger from '../config/logger';

import dotenv from 'dotenv';
dotenv.config();

export { DataTypes } from 'sequelize';

let DATABASE = process.env.DATABASE;
let USERNAME_DB = process.env.USERNAME_DB;
let PASSWORD_DB = process.env.PASSWORD_DB;
let HOST = process.env.HOST;
let PORT = process.env.PORT;
let DIALECT = process.env.DIALECT;

if (process.env.NODE_ENV === 'test') {
  DATABASE = process.env.DATABASE;
  USERNAME_DB = process.env.USERNAME_DB;
  PASSWORD_DB = process.env.PASSWORD_DB;
  HOST = process.env.HOST;
  PORT = process.env.PORT;
  DIALECT = process.env.DIALECT;
}

const sequelize = new Sequelize(DATABASE, USERNAME_DB, PASSWORD_DB, {
  host: HOST,
  port: PORT,
  dialect: DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connected to the database.');
  })
  .catch((error) => {
    logger.error('Could not connect to the database.', error);
  });

sequelize.sync();

export default sequelize;
