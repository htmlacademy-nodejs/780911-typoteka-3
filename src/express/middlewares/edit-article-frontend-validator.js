"use strict";

const { sendResponse } = require("../../utils");
const {HttpCode} = require("../../constants");
const ArticleKeys = [
  `createdDate`,
  `title`,
  `announce`,
  `fullText`,
  `categories`,
];

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = ArticleKeys.some((key) => keys.includes(key));
  if (!keysExists) {
    sendResponse(res, HttpCode.BAD_REQUEST, `no such fields in offer`);
  } else {
    next();
  }
};
