"use strict";

require("dotenv").config();
const { Sequelize } = require('sequelize');
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const notDefinedENVVars = [
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
].filter((envVar) => envVar === undefined);

console.log(notDefinedENVVars.join(", "));

if (notDefinedENVVars.length > 0) {
  throw new Error(
    `One or more environmental variables are not defined: ${notDefinedENVVars.join(
      ", "
    )}`
  );
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: `postgres`,
  pool: {
    max: 5,
    min: 0,
    acquire: 10000,
    idle: 10000,
  },
});

module.exports = {
  sequelize,
};
