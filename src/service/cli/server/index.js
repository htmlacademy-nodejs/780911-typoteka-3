"use strict";

const express = require(`express`);
const http = require(`http`);
const {HttpCode} = require(`../../../http-code`);
const routes = require(`../../api`);
const {getLogger} = require(`./logger`);
const logger = getLogger();
const {getSequelize} = require(`../../lib/sequelize.js`);
const {sendResponse} = require("../../../utils");
const {API_PREFIX, ExitCode} = require("../../../constants");
const DEFAULT_PORT = 3000;
const app = express();
const server = http.createServer(app);
const notFoundMessageText = `Not found`;

app.use(express.json());

app.use((req, res, next) => {
  logger.debug(`Start request to url ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`End request with status code ${res.statusCode}`);
  });
  next();
});


app.use(API_PREFIX, routes);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  logger.error(`Route not found: ${req.url}`);
});

app.use(function (req, res) {
  logger.error(`requested page is not found ${res.statusCode}`);
  sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occurred: ${err.message}`);
});


module.exports = {
  name: `--server`,
  async run(args) {
  const sequelize = getSequelize();
  try {
     await sequelize.authenticate();
     logger.info(`Соединение с сервером установлено!`);
  } catch (err) {
      logger.error(`Не удалось установить соединение по причине: ${err}`);
      process.exit(ExitCode.error);
  }
    logger.info(`Connection to database established`);

    const port = args ? Number.parseInt(args[0], 10) : DEFAULT_PORT;

    try {
      server.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occurred on server creation: ${err.message}`);
        }

        return logger.info(`Listening to connections on ${port}`);
      });

    } catch (err) {
      logger.error(`An error occurred: ${err.message}`);
      process.exit(1);
    }
  }
};


