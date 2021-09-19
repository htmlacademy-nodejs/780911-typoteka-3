"use strict";

const { server } = require(`./server`);
const DEFAULT_PORT = 3000;
const { getLogger } = require(`./logger`);
const logger = getLogger();
const { getSequelize } = require(`../../lib/sequelize`);
const { ExitCode } = require("../../../constants");

const name = `--server`;

const run = async (args) => {
  try {
    await getSequelize.authenticate();
    console.log(`Соединение с сервером установлено!`);
    logger.info(`Соединение с сервером установлено!`);
  } catch (err) {
    logger.error(`Не удалось установить соединение по причине: ${err}`);
    process.exit(ExitCode.error);
  }

  const app = await server();
  const port = args ? Number.parseInt(args[0], 10) : DEFAULT_PORT;

  app.listen(port, (err) => {
    if (err) {
      logger.error(`Ошибка при создании сервера`, err);
    }
    console.log(`Ожидаю соединений на ${port} src/service/cli/server/index.js`);
    return logger.info(`Ожидаю соединений на ${port}`);
  });
};

module.exports = {
  name,
  run,
};
