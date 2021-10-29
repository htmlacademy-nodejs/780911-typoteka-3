"use strict";

const { HttpCode } = require(`../../constants`);

module.exports = (service) => async (req, res, next) => {
  const { articleId } = req.params;

  const article = await service.findOne({ articleId });

  if (!article) {
    return res
      .status(HttpCode.NOT_FOUND)
      .send(`article with ${articleId} not found`);
  }

  return next();
};
