"use strict";

const help = require(`./help`);
const filldb = require(`./fill-db`);
const version = require(`./version`);
const server = require(`./server/index.js`);
const Cli = {
  [filldb.name]: filldb,
  [help.name]: help,
  [version.name]: version,
  [server.name]: server,
};

module.exports = {
  Cli,
};
