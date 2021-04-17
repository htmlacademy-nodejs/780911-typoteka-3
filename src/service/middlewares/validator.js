"use strict";

const ArticleKeys = [`title`, `announce`, `fullText`, `category`];
const { HttpCode } = require(`../../HttpCode`);
const { sendResponse } = require(`../../utils`);

const articleValidator = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = ArticleKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    sendResponse(res, HttpCode.BAD_REQUEST, `some fields are not valid`);
  }
};

const articlePutValidator = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = ArticleKeys.some((key) => keys.includes(key));

  if (!keysExists) {
    sendResponse(res, HttpCode.BAD_REQUEST, `no such fields in offer`);
  }
};

const commentValidator = (req, res, next) => {
  if (`text` in req.body) {
    next();
  } else {
    sendResponse(res, HttpCode.BAD_REQUEST, `invalid input`);
  }
};

module.exports = {
  articleValidator,
  articlePutValidator,
  commentValidator,
};
