"use strict";
//TODO: throw away unnecessary code with mock work

const express = require(`express`);
const http = require(`http`);
const {HttpCode} = require(`../../../HttpCode`);
const routes = require(`../../api`);
const {getLogger} = require(`./logger`);
const logger = getLogger();
const {getSequelize} = require(`../../lib/sequelize.js`);
const {sendResponse} = require("../../../utils");
const {API_PREFIX} = require("../../../constants");
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
     console.log(`Соединение с сервером установлено!`);
     logger.info(`Соединение с сервером установлено!`);
  } catch (err) {
      logger.error(`Не удалось установить соединение по причине: ${err}`);
      process.exit(ExitCode.error);
  }
    logger.info(`Connection to database established`);
    console.log(`Connection to database established`);

    const port = args ? Number.parseInt(args[0], 10) : DEFAULT_PORT;

    try {
      server.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occured on server creation: ${err.message}`);
        }

        return logger.info(`Listening to connections on ${port}`);
      });

    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
  }
};

//
// //const { server } = require(`./server`);
// const DEFAULT_PORT = 3000;
// const { getLogger } = require(`./logger`);
// const logger = getLogger();
// const { getSequelize } = require(`../../lib/sequelize`);
// const defineModels = require(`../../models`);
// const { ExitCode } = require("../../../constants");
// const express = require(`express`);
// const { Router } = require(`express`);
// //const apiRoutes = require(`./api-routes`);
// const apiRoutes = require(`../../api`)
// const postsRouter = new Router();
// const { HttpCode } = require(`../../../HttpCode`);
// const { sendResponse, returnArticles, returnTitles } = require(`../../../utils`);
// const notFoundMessageText = `Not found`;
// const MOCK_FILE_PATH = `./mocks.json`;
//
//
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
//   try {
//     logger.info(`Trying to connect to database...`);
//     await getSequelize.authenticate();
//   } catch (err) {
//     logger.error(`An error occurred: ${err.message}`);
//     process.exit(ExitCode.error);
//   }
//
//   const { Post, Category } = defineModels(getSequelize);
//   const allPosts = await Post.findAll({raw: true,});
//   const allTitles = await returnTitles(allPosts);
//   const message = allTitles.map((post) => `<li>${post}</li>`).join(``);
//   console.log('all posts', allPosts);
//   // logger.info(`Connection to database established`);
//   console.log(`Connection to database established`);
//
//   const app = express();
//
//   app.use(`/api`, await apiRoutes.postRoutes(defineModels(getSequelize)));
//
//   app.use(function (req, res, next) {
//     logger.info(`Start request to url ${req.url}`);
//     next();
//   });

  // app.get(`/`, async (req, res) => {

  //   try {
  //     sendResponse(
  //       res,
  //       HttpCode.OK,
  //       `<p>default page</p></p><ul>${message}</ul>`
  //     );
  //     logger.info(`End request with status code ${res.statusCode}`);
  //   } catch (err) {
  //     logger.error(`End request with error ${res.statusCode}`);
  //     sendResponse(res, HttpCode.NOT_FOUND, err);
  //   }
  // });
  //
  // app.use(
  //   `/posts`,
  //   postsRouter.get(`/`, async (req, res) => {
  //     res.json(allPosts);
  //     logger.info(`End request get /posts with status code ${res.statusCode}`);
  //     console.log(`End request get /posts with status code ${res.statusCode}`);
  //   })
  // );

//   app.use(function (req, res) {
//     logger.error(`requested page is not found ${res.statusCode}`);
//     sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
//   });
//
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

// const { server } = require(`./server`);
// const DEFAULT_PORT = 3000;
// const { getLogger } = require(`./logger`);
// const logger = getLogger();
// const { getSequelize } = require(`../../lib/sequelize`);
// const { ExitCode } = require("../../../constants");
//

