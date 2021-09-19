"use strict";
//TODO: throw away unnecessary code with mock work

//const { server } = require(`./server`);
const DEFAULT_PORT = 3000;
const { getLogger } = require(`./logger`);
const logger = getLogger();
const { getSequelize } = require(`../../lib/sequelize`);
const defineModels = require(`../../models`);
const { ExitCode } = require("../../../constants");
const express = require(`express`);
const { Router } = require(`express`);
const apiRoutes = require(`./api-routes`);
const postsRouter = new Router();
const { HttpCode } = require(`../../../HttpCode`);
const { sendResponse, returnArticles, returnTitles } = require(`../../../utils`);
const notFoundMessageText = `Not found`;
const MOCK_FILE_PATH = `./mocks.json`;



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

  try {
    logger.info(`Trying to connect to database...`);
    await getSequelize.authenticate();
  } catch (err) {
    logger.error(`An error occurred: ${err.message}`);
    process.exit(ExitCode.error);
  }

  const { Post, Category } = defineModels(getSequelize);
  const allPosts = await Post.findAll({raw: true,});
  const allTitles = await returnTitles(allPosts);
  const message = allTitles.map((post) => `<li>${post}</li>`).join(``);
  console.log('all posts', allPosts);
  // logger.info(`Connection to database established`);
  console.log(`Connection to database established`);

  const app = express();

  app.use(`/api`, await apiRoutes());

  app.use(function (req, res, next) {
    logger.info(`Start request to url ${req.url}`);
    next();
  });

  app.get(`/`, async (req, res) => {

    try {
      sendResponse(
        res,
        HttpCode.OK,
        `<p>default page</p></p><ul>${message}</ul>`
      );
      logger.info(`End request with status code ${res.statusCode}`);
    } catch (err) {
      logger.error(`End request with error ${res.statusCode}`);
      sendResponse(res, HttpCode.NOT_FOUND, err);
    }
  });

  app.use(
    `/posts`,
    postsRouter.get(`/`, async (req, res) => {
      // const jsonRes = JSON.parse(await fs.readFile(MOCK_FILE_PATH, `utf8`));
      //res.json(jsonRes);
      res.json(allPosts);
      logger.info(`End request get /posts with status code ${res.statusCode}`);
      console.log(`End request get /posts with status code ${res.statusCode}`);
    })
  );

  app.use(function (req, res) {
    logger.error(`requested page is not found ${res.statusCode}`);
    sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
  });

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

// const { server } = require(`./server`);
// const DEFAULT_PORT = 3000;
// const { getLogger } = require(`./logger`);
// const logger = getLogger();
// const { getSequelize } = require(`../../lib/sequelize`);
// const { ExitCode } = require("../../../constants");
//
// const name = `--server`;
//
// const run = async (args) => {
//   try {
//     await getSequelize.authenticate();
//     console.log(`Соединение с сервером установлено!`);
//     logger.info(`Соединение с сервером установлено!`);
//   } catch (err) {
//     logger.error(`Не удалось установить соединение по причине: ${err}`);
//     process.exit(ExitCode.error);
//   }
//
//   const app = await server();
//   const port = args ? Number.parseInt(args[0], 10) : DEFAULT_PORT;
//
//   app.listen(port, (err) => {
//     if (err) {
//       logger.error(`Ошибка при создании сервера`, err);
//     }
//     console.log(`Ожидаю соединений на ${port} src/service/cli/server/index.js`);
//     return logger.info(`Ожидаю соединений на ${port}`);
//   });
// };
//
// module.exports = {
//   name,
//   run,
// };
