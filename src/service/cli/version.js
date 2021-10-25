"use strict";

const chalk = require("chalk");
const packageVersion = require("../../../package.json").version;

module.exports = {
  name: "--version",
  run() {
    // console.log(chalk.blue(packageVersion));
  }
}
