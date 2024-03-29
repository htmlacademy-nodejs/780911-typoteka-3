"use strict";

const chalk = require("chalk");
const helpText = `
Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    service.js <command>
    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --filldb <count>      наполняет БД данными в количестве count
    --server <port>       запустит порт для бека на порту <port>
`;


module.exports = {
  name: "--help",
  run() {
    console.log(chalk.gray(helpText))
  }
}
