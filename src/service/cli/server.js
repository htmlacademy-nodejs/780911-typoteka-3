"use strict";

const DEFAULT_PORT = 3000;
const MOCK_FILE_PATH = `./mocks.json`;
const fs = require(`fs`).promises;
const fs2 = require(`fs`);
const chalk = require(`chalk`);
const { HttpCode } = require(`../../HttpCode`);
const { Router } = require(`express`);
const postsRouter = new Router();
const express = require(`express`);
const { readContentJSON, returnItemByID } = require(`../../utils`);

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    "Content-Type": `text/html; charset=UTF-8`,
  });

  res.end(template);
};

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

module.exports = {
  name: `--server`,
  async run(args) {
    const port = args ? Number.parseInt(args[0], 10) : DEFAULT_PORT;
    const notFoundMessageText = `Not found`;
    const articlesList = await returnArticles(MOCK_FILE_PATH);
    const titlesList = await returnTitles(articlesList);
    const message = titlesList.map((post) => `<li>${post}</li>`).join(``);

    const app = express();

    app.get(`/`, async (req, res) => {
      try {
        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, err, req, res);
      }
    });

    app.use(
      `/posts`,
      postsRouter.get(`/`, async (req, res) => {
        const jsonRes = JSON.parse(await fs.readFile(MOCK_FILE_PATH, `utf8`));
        res.json(jsonRes);
      })
    );

    app.get(
      `/api/articles`,
      postsRouter.get(`/`, async (req, res) => {
        try {
          res.json(articlesList);
        } catch (e) {
          sendResponse(
            res,
            HttpCode.NOT_FOUND,
            `the articles list is not found`
          );
        }
      })
    );

    app.get(
      `/api/articles/:articleId`,
      postsRouter.get(`/`, async (req, res) => {
        try {
          const article = await returnItemByID(
            articlesList,
            req.params.articleId
          );
          console.log("article", article);
          if (article) {
            res.json(article);
          } else {
            sendResponse(
              res,
              HttpCode.NOT_FOUND,
              `the article with id ${req.params.articleId} is not found`
            );
          }
        } catch (err) {
          sendResponse(res, HttpCode.NOT_FOUND, err);
        }
      })
    );

    app.use(function (req, res) {
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
    });

    app.listen(port, (err) => {
      if (err) {
        return console.error(`Ошибка при создании сервера`, err);
      }
      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  },
};
