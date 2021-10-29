"use strict";
const { HttpCode } = require("../../constants");
const { sendResponse } = require("../../utils");

const ArticleKeys = [
  `createdDate`,
  `title`,
  `announce`,
  `fullText`,
  `categories`,
];

const articleExist = (postService) => async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const post = await postService.findOne(
      articleId,
      Boolean(req.query.withComments)
    );
    if (!post) {
      res.status(404).send(`Post ${articleId} not found`);
    }
  } catch (e) {
    next(e);
  }
};

const articlePutValidator = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = ArticleKeys.some((key) => keys.includes(key));
  if (!keysExists) {
    sendResponse(res, HttpCode.BAD_REQUEST, `no such fields in offer`);
  } else {
    next();
  }
};

module.exports = {
  articleExist,
  articlePutValidator,
};
