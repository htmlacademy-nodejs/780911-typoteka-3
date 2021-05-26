"use strict";

const {server} = require(`./server`);
const DEFAULT_PORT = 3000;
const {getLogger} = require(`./logger`);
const logger = getLogger();

const name = `--server`;
let app;
const run = async (args) => {
  app = await server();
  const port = args ? Number.parseInt(args[0], 10) : DEFAULT_PORT;

  app.listen(port, (err) => {
    if (err) {
      logger.error(`Ошибка при создании сервера`, err);
    }
    return logger.info(`Ожидаю соединений на ${port}`);
  });
};

module.exports = {
  name,
  run,
};
