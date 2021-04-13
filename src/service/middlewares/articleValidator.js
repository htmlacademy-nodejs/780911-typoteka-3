"use strict";

const ArticleKeys = [
  `category`,
  `description`,
  `picture`,
  `title`,
  `fullText`,
  `sum`,
];
const { HttpCode } = require(`../../HttpCode`);

const articleValidator = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = ArticleKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  next();
};

module.exports = {
  articleValidator,
};
