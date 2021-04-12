"use strict";

const DEFAULT_PORT = 3000;
const MOCK_FILE_PATH = `./mocks.json`;
const TITLES = `./data/titles.txt`;
const ANNOUNCE = `./data/sentences.txt`;
const CATEGORIES = `./data/categories.txt`;
const COMMENTS = `./data/comments.txt`;
const fs = require(`fs`).promises;
const fs2 = require(`fs`);
const chalk = require(`chalk`);
const { HttpCode } = require(`../../HttpCode`);
const { Router } = require(`express`);
const postsRouter = new Router();
const express = require(`express`);
const {
  readContentJSON,
  returnItemByID,
  readContentTxt,
  generatePublications,
  createCommentsList,
} = require(`../../utils`);

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
    let articlesList = await returnArticles(MOCK_FILE_PATH);
    const titlesList = await returnTitles(articlesList);
    const categories = await readContentTxt(CATEGORIES);
    const titles = await readContentTxt(TITLES);
    const sentences = await readContentTxt(ANNOUNCE);
    const comments = await readContentTxt(COMMENTS);
    const message = titlesList.map((post) => `<li>${post}</li>`).join(``);

    const app = express();
    // eslint-disable-next-line new-cap
    const api = express.Router();
    app.use("/api", api);

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

    api.get(`/articles`, async (req, res) => {
      try {
        res.json(articlesList);
      } catch (e) {
        sendResponse(res, HttpCode.NOT_FOUND, `the articles list is not found`);
      }
    });

    api.post(`/articles`, async (req, res) => {
      try {
        const newArticle = generatePublications(
          1,
          titles,
          categories,
          sentences,
          comments
        );
        articlesList.push(newArticle[0]);
        res.json(articlesList[articlesList.length - 1]);
      } catch (e) {
        sendResponse(res, HttpCode.NOT_FOUND, `the articles list is not found`);
      }
    });

    api.get(`/categories`, async (req, res) => {
      try {
        res.json(categories);
      } catch (e) {
        sendResponse(
          res,
          HttpCode.NOT_FOUND,
          `the categories list is not found`
        );
      }
    });

    api.get(`/articles/:articleId`, async (req, res) => {
      try {
        const article = await returnItemByID(
          articlesList,
          req.params.articleId
        );
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
    });

    api.put(`/articles/:articleId`, async (req, res) => {
      try {
        const article = await returnItemByID(
          articlesList,
          req.params.articleId
        );
        if (article) {
          article.title = `Updated ${article.title}`;
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
    });

    api.delete(`/articles/:articleId`, async (req, res) => {
      try {
        const article = await returnItemByID(
          articlesList,
          req.params.articleId
        );

        if (article) {
          articlesList = articlesList.filter(
            (item) => item.id !== req.params.articleId
          );

          if (articlesList.length < 1) {
            sendResponse(
              res,
              HttpCode.NOT_FOUND,
              `the article with id ${req.params.articleId} is not found`
            );
          } else {
            res.json(articlesList);
          }
        }
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, err);
      }
    });

    api.delete(`/articles/:articleId/comments/:commentId`, async (req, res) => {
      try {
        const article = await returnItemByID(
          articlesList,
          req.params.articleId
        );
        const comment = await returnItemByID(
          article.comments,
          req.params.commentId
        );

        if (article && comment) {
          const newCommentsList = article.comments.filter(
            (item) => item.id !== req.params.commentId
          );

          article.comments = newCommentsList;
          res.json(article);
        } else {
          sendResponse(
            res,
            HttpCode.NOT_FOUND,
            `no such article or article's comment`
          );
        }
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, err);
      }
    });

    api.post(`/articles/:articleId/comments`, async (req, res) => {
      try {
        const article = await returnItemByID(
          articlesList,
          req.params.articleId
        );
        const newComment = createCommentsList(comments, 1);

        article.comments.push(newComment[0]);
        res.json(article);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, err);
      }
    });

    api.get(`/search`, async (req, res) => {
      const foundByTitleArr = articlesList.filter((item) => {
        return item.title.includes(req.query.query);
      });

      if (foundByTitleArr.length) {
        try {
          res.json(foundByTitleArr);
        } catch (err) {
          sendResponse(res, HttpCode.NOT_FOUND, err);
        }
      } else {
        sendResponse(res, HttpCode.NOT_FOUND, `no articles with such title`);
      }
    });

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
