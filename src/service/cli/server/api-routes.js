"use strict";

const MOCK_FILE_PATH = `./mocks.json`;
const CATEGORIES = `./data/categories.txt`;
const { HttpCode } = require(`../../../HttpCode`);

const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.json();
const {
  articleValidator,
  articlePutValidator,
  commentValidator,
} = require(`../../middlewares/validator`);
const {
  returnItemByID,
  readContentTxt,
  createArticle,
  sendResponse,
  createComment,
  returnArticles,
} = require(`../../../utils`);



const api = async () => {
  const { Router } = require(`express`);
  const router = new Router();
  let articlesList = await returnArticles(MOCK_FILE_PATH);
  const categories = await readContentTxt(CATEGORIES);
  router.get(`/articles`, async (req, res) => {
    try {
      res.json(articlesList);
    } catch (e) {
      sendResponse(res, HttpCode.NOT_FOUND, `the articles list is not found`);
    }
  });

  router.post(`/articles`, jsonParser, articleValidator, async (req, res) => {
    try {
      const newArticle = createArticle(req.body);
      articlesList.push(newArticle);
      res.json(articlesList[articlesList.length - 1]);
    } catch (e) {
      sendResponse(res, HttpCode.NOT_FOUND, `the articles list is not found`);
    }
  });

  router.get(`/categories`, async (req, res) => {
    try {
      res.json(categories);
    } catch (e) {
      sendResponse(res, HttpCode.NOT_FOUND, `the categories list is not found`);
    }
  });

  router.get(`/articles/:articleId`, async (req, res) => {
    try {
      const article = await returnItemByID(articlesList, req.params.articleId);
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

  router.put(
    `/articles/:articleId`,
    jsonParser,
    articlePutValidator,
    async (req, res) => {
      try {
        let article = await returnItemByID(articlesList, req.params.articleId);
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

  router.delete(`/articles/:articleId`, async (req, res) => {
    try {
      const article = await returnItemByID(articlesList, req.params.articleId);

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

  router.delete(
    `/articles/:articleId/comments/:commentId`,
    async (req, res) => {
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
    }
  );

  router.post(
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

  router.get(`/search`, async (req, res) => {
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

  return router;
};

module.exports = api;
