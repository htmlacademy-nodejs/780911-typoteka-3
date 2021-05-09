"use strict";

const MOCK_FILE_PATH = `./mocks.json`;
const { HttpCode } = require(`../../../HttpCode`);
const { readContentJSON, sendResponse } = require(`../../../utils`);
const notFoundMessageText = `Not found`;
const express = require(`express`);
const fs = require(`fs`).promises;
const fs2 = require(`fs`);


const returnArticles = async (file) => {
  const errMessage = `The file on ${file} does not exist.`;

  try {
    if (fs2.existsSync(file)) {
      const mockData = await readContentJSON(file);
      return mockData;
    } else {
      console.log(errMessage);
      return false;
    }
  } catch (err) {
    console.log(errMessage);
    return false;
  }
};

const returnTitles = async (articlesLIst) => {
  try {
    return articlesLIst.map((item) => {
      return item.title;
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

let app;
const server = async () => {
  app = express();
  const { Router } = require(`express`);
  const apiRoutes = require(`./api-routes`);
  let articlesList = await returnArticles(MOCK_FILE_PATH);
  const titlesList = await returnTitles(articlesList);
  const message = titlesList.map((post) => `<li>${post}</li>`).join(``);
  const postsRouter = new Router();
  const { getLogger } = require(`./logger`);
  const log = getLogger();

  app.use(`/api`, await apiRoutes());

  app.use(function (req, res, next) {
    log.info(`Start request to url ${req.url}`);
    next();
  });
  app.get(`/`, async (req, res) => {
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
