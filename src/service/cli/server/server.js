"use strict";

const MOCK_FILE_PATH = `./mocks.json`;
const { HttpCode } = require(`../../../HttpCode`);
const { sendResponse, returnArticles, returnTitles } = require(`../../../utils`);
const notFoundMessageText = `Not found`;
const express = require(`express`);
const fs = require(`fs`).promises;
const {getLogger} = require(`./logger`);
const {getSequelize} = require("../../lib/sequelize");
const {ExitCode} = require("../../../constants");
const log = getLogger();
const define = require(`../../models/index`);


let app;
const server = async () => {
  app = express();
  const { Router } = require(`express`);
  const apiRoutes = require(`./api-routes`);
   let articlesList = await returnArticles(MOCK_FILE_PATH);
   const titlesList = await returnTitles(articlesList);
   const message = titlesList.map((post) => `<li>${post}</li>`).join(``);
  const postsRouter = new Router();

  app.use(`/api`, await apiRoutes());

  app.use(function (req, res, next) {
    log.info(`Start request to url ${req.url}`);
    next();
  });
  app.get(`/`, async (req, res) => {

    try {
      log.info(`Trying to connect to database...`);
      await getSequelize.authenticate();
    } catch (err) {
      log.error(`An error occurred: ${err.message}`);
      process.exit(ExitCode.error);
    }

   // const posts = await define.Post.findAll();
   //  const posts = await define(getSequelize).Post.findAll();
   //  console.log(posts);
    // console.log(posts.every(post => post instanceof define.Post)); // true
    //console.log("All posts:", JSON.stringify(posts, null, 2));

    // log.info(`Connection to database established`);
    console.log(`Connection to database established 111`);
    // console.log(`Connection to database established`);
     const message = JSON.stringify(articlesList, null, 2);
    // const message = `hohoho`;
    try {
      sendResponse(
        res,
        HttpCode.OK,
        `<p>default page</p></p><ul>${message}</ul>`
      );
      log.info(`End request with status code ${res.statusCode}`);
    } catch (err) {
      log.error(`End request with error ${res.statusCode}`);
      sendResponse(res, HttpCode.NOT_FOUND, err);
    }
  });

  app.use(
    `/posts`,
    postsRouter.get(`/`, async (req, res) => {
      const jsonRes = JSON.parse(await fs.readFile(MOCK_FILE_PATH, `utf8`));
      res.json(jsonRes);
      log.info(`End request ПУЕЖ /posts with status code ${res.statusCode}`);
    })
  );

  app.use(function (req, res) {
    log.error(`requested page is not found ${res.statusCode}`);
    sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
  });

  return app;
};

module.exports = {
  server,
  app,
};
