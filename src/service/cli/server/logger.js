"use strict";
const pino = require(`pino`);

const { Env } = require(`../../../constants`);
const LOG_FILE = `./src/service/logs/api.log`;
const isDevMode = process.env.NODE_ENV === Env.DEVELOPMENT;
const defaultLogLevel = isDevMode ? `info` : `error`;

const logger = pino(
  {
    name: `pino-and-express`,
    level: process.env.LOG_LEVEL || defaultLogLevel,
    prettyPrint: isDevMode,
  },
  isDevMode ? process.stdout : pino.destination(LOG_FILE)
);

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  },
};
