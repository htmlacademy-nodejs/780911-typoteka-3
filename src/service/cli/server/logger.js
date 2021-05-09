'use strict';
const pino = require(`pino`);

const logger = pino({
  name: `pino-and-express`,
  level: process.env.LOG_LEVEL || `info`,
  prettyPrint: {
    colorize: true,
    translateTime: `yyyy-dd-mm, h:MM:ss TT`,
  },
}, pino.destination({dest: `./src/service/logs/logs`, sync: false}));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
