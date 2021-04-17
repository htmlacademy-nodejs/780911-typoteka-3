"use strict";

const DEFAULT_PORT = 3000;
const MOCK_FILE_PATH = `./mocks.json`;
const CATEGORIES = `./data/categories.txt`;
const fs = require(`fs`).promises;
const fs2 = require(`fs`);
const chalk = require(`chalk`);
const { HttpCode } = require(`../../HttpCode`);
const { Router } = require(`express`);
const postsRouter = new Router();
const express = require(`express`);
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.json();
const {
  articleValidator,
  articlePutValidator,
  commentValidator,
} = require(`../middlewares/validator`);

const {
  readContentJSON,
  returnItemByID,
  readContentTxt,
  createArticle,
  sendResponse,
  createComment
} = require(`../../utils`);

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

    api.post(`/articles`, jsonParser, articleValidator, async (req, res) => {
      try {
        const newArticle = createArticle(req.body);
        articlesList.push(newArticle);
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

    api.put(
      `/articles/:articleId`,
      jsonParser,
      articlePutValidator,
      async (req, res) => {
        try {
          let article = await returnItemByID(
            articlesList,
            req.params.articleId
          );
          if (article) {
            article = { ...article, ...req.body };
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
      }
    );

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

    api.post(
      `/articles/:articleId/comments`,
      jsonParser,
      commentValidator,
      async (req, res) => {
        try {
          const article = await returnItemByID(
            articlesList,
            req.params.articleId
          );
          const newComment = createComment(req.body.text);

          article.comments.push(newComment);
          res.json(article);
        } catch (err) {
          sendResponse(res, HttpCode.NOT_FOUND, err);
        }
      }
    );

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
