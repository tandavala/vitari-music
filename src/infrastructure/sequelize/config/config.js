require("dotenv").config();
const Sequelize = require("sequelize");

const {
  DB_USER,
  DB_PASS,
  DB_HOST,
  DEV_DB_NAME,
  TEST_DB_NAME,
  PROD_DB_NAME,
  NODE_ENV,
} = process.env;

const databaseCredentials = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DEV_DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
  },
  test: {
    username: DB_USER,
    password: DB_PASS,
    database: DEV_DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
  },
  production: {
    username: DB_USER,
    password: DB_PASS,
    database: DEV_DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
  },
};

const { username, password, database, host, dialect } =
  databaseCredentials[NODE_ENV];

module.exports = databaseCredentials;

module.exports.connection = new Sequelize(database, username, password, {
  host,
  dialect,
  port: 3306,
  dialectOptions: {
    multipleStatements: true,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
});
