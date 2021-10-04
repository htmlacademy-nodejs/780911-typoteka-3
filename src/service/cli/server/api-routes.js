"use strict";
// Commented routes are implemented in service/api
const MOCK_FILE_PATH = `./mocks.json`;
const CATEGORIES = `./data/categories.txt`;
const { HttpCode } = require(`../../../HttpCode`);

const bodyParser = require(`body-parser`);
const {findReplaceItemById} = require("../../../utils");
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
const { getLogger } = require(`./logger`);
const log = getLogger();
// TODO: commented routes are replaced to corresponding files in api folder

const api = async () => {
  const { Router } = require(`express`);
  const router = new Router();
  let articlesList = await returnArticles(MOCK_FILE_PATH);
  const categories = await readContentTxt(CATEGORIES);


  // router.get(`/articles`, async (req, res) => {
  //   try {
  //     res.json(articlesList);
  //     log.info(`End request GET: /articles with status code ${res.statusCode}`);
  //   } catch (e) {
  //     sendResponse(res, HttpCode.NOT_FOUND, `the articles list is not found`);
  //     log.error(`End request GET: /articles with error ${res.statusCode}`);
  //   }
  // });

  // router.post(`/articles`, jsonParser, articleValidator, async (req, res) => {
  //   try {
  //     const newArticle = createArticle(req.body);
  //     articlesList.push(newArticle);
  //     res.json(articlesList[articlesList.length - 1]);
  //     log.info(
  //       `End request POST: /articles with status code ${res.statusCode}`
  //     );
  //   } catch (e) {
  //     sendResponse(res, HttpCode.NOT_FOUND, `the articles list is not found`);
  //     log.error(`End request POST: /articles with error ${res.statusCode}`);
  //   }
  // });

  router.get(`/categories`, async (req, res) => {
    try {
      res.json(categories);
      log.info(
        `End request GET: /categories with status code ${res.statusCode}`
      );
    } catch (e) {
      sendResponse(res, HttpCode.NOT_FOUND, `the categories list is not found`);
      log.error(`End request GET: /categories with error ${res.statusCode}`);
    }
  });

  // router.get(`/articles/:articleId`, async (req, res) => {
  //   try {
  //     const article = await returnItemByID(articlesList, req.params.articleId);
  //     if (article) {
  //       res.json(article);
  //       log.info(
  //         `End request GET: /articles/:articleId with status code ${res.statusCode}`
  //       );
  //     } else {
  //       sendResponse(
  //         res,
  //         HttpCode.NOT_FOUND,
  //         `the article with id ${req.params.articleId} is not found`
  //       );
  //       log.error(
  //         `End request GET: /articles/:articleId with error ${res.statusCode}`
  //       );
  //     }
  //   } catch (err) {
  //     sendResponse(res, HttpCode.NOT_FOUND, err);
  //     log.error(
  //       `End request GET: /articles/:articleId with error ${res.statusCode}`
  //     );
  //   }
  // });

  // router.put(
  //   `/articles/:articleId`,
  //   jsonParser,
  //   articlePutValidator,
  //   async (req, res) => {
  //     try {
  //       let article = await returnItemByID(articlesList, req.params.articleId);
  //       if (article) {
  //         article = { ...article, ...req.body };
  //         res.json(article);
  //         articlesList = findReplaceItemById(articlesList, article);
  //         log.info(
  //           `End request PUT: /articles/:articleId with status code ${res.statusCode}`
  //         );
  //       } else {
  //         sendResponse(
  //           res,
  //           HttpCode.NOT_FOUND,
  //           `the article with id ${req.params.articleId} is not found`
  //         );
  //         log.error(
  //           `End request PUT: /articles/:articleId with error ${res.statusCode}`
  //         );
  //       }
  //     } catch (err) {
  //       sendResponse(res, HttpCode.NOT_FOUND, err);
  //       log.error(
  //         `End requestPUT: /articles/:articleId  with error ${res.statusCode}`
  //       );
  //     }
  //   }
  // );

  // router.delete(`/articles/:articleId`, async (req, res) => {
  //   try {
  //     const article = await returnItemByID(articlesList, req.params.articleId);
  //
  //     if (article) {
  //       articlesList = articlesList.filter(
  //         (item) => item.id !== req.params.articleId
  //       );
  //       res.json(articlesList);
  //       log.info(
  //         `End request DELETE: /articles/:articleId with status code ${res.statusCode}`
  //       );
  //     } else {
  //       sendResponse(
  //         res,
  //         HttpCode.NOT_FOUND,
  //         `the article with id ${req.params.articleId} is not found`
  //       );
  //       log.error(
  //         `End request DELETE: /articles/:articleId with error ${res.statusCode}`
  //       );
  //     }
  //   } catch (err) {
  //     sendResponse(res, HttpCode.NOT_FOUND, err);
  //     log.error(
  //       `End request DELETE: /articles/:articleId with error ${res.statusCode}`
  //     );
  //   }
  // });

  // router.delete(
  //   `/articles/:articleId/comments/:commentId`,
  //   async (req, res) => {
  //     try {
  //       const article = await returnItemByID(
  //         articlesList,
  //         req.params.articleId
  //       );
  //
  //       const comment = await returnItemByID(
  //         article.comments,
  //         req.params.commentId
  //       );
  //
  //       if (article && comment) {
  //         const newCommentsList = article.comments.filter(
  //           (item) => item.id !== req.params.commentId
  //         );
  //
  //         article.comments = newCommentsList;
  //         res.json(article);
  //         log.info(
  //           `End request DELETE: /articles/:articleId/comments/:commentId with status code ${res.statusCode}`
  //         );
  //       } else {
  //         sendResponse(
  //           res,
  //           HttpCode.NOT_FOUND,
  //           `no such article or article's comment`
  //         );
  //         log.error(
  //           `End request DELETE: /articles/:articleId/comments/:commentId with error ${res.statusCode}`
  //         );
  //       }
  //     } catch (err) {
  //       sendResponse(res, HttpCode.NOT_FOUND, err);
  //       log.error(
  //         `End request DELETE: /articles/:articleId/comments/:commentId with error ${res.statusCode}`
  //       );
  //     }
  //   }
  // );

  // router.post(
  //   `/articles/:articleId/comments`,
  //   jsonParser,
  //   commentValidator,
  //   async (req, res) => {
  //     try {
  //       const article = await returnItemByID(
  //         articlesList,
  //         req.params.articleId
  //       );
  //       const newComment = createComment(req.body.text);
  //
  //       article.comments.push(newComment);
  //       res.json(article);
  //       log.info(
  //         `End request POST: /articles/:articleId/comments with status code ${res.statusCode}`
  //       );
  //     } catch (err) {
  //       sendResponse(res, HttpCode.NOT_FOUND, err);
  //       log.error(
  //         `End request POST: /articles/:articleId/comments with error ${res.statusCode}`
  //       );
  //     }
  //   }
  // );

  router.get(`/search`, async (req, res) => {
    const foundByTitleArr = articlesList.filter((item) => {
      return item.title.includes(req.query.query);
    });

    if (foundByTitleArr.length) {
      try {
        res.json(foundByTitleArr);
        log.info(`End request GET: /search with status code ${res.statusCode}`);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, err);
        log.error(`End request GET: /search with error ${res.statusCode} 1`);
      }
    } else {
      sendResponse(res, HttpCode.NOT_FOUND, `no articles with such title`);
      log.error(`End request GET: /search with error ${res.statusCode}`);
    }
  });

  return router;
};

module.exports = api;
