"use strict";

const ArticleKeys = [`created_date`,`title`, `announce`, `full_text`, `categories`];
const { HttpCode } = require(`../../HttpCode`);
const { sendResponse } = require(`../../utils`);

const articleBackEndValidator = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = ArticleKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    sendResponse(
      res,
      HttpCode.BAD_REQUEST,
      `some fields are not valid ${Object.keys(newArticle).join()}`
    );
  } else {
    next();
  }
};

const articlePutValidator = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = ArticleKeys.some((key) => keys.includes(key));
  console.log("Got article in validator on back", newArticle);
  if (!keysExists) {
     console.log("article DOES NOT pass validation on back", Object.keys(newArticle).join());
    sendResponse(res, HttpCode.BAD_REQUEST, `no such fields in offer`);
  } else {
     console.log("article passes validation on back");
    next();
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
  articleBackEndValidator,
  articlePutValidator,
  commentValidator,
};
