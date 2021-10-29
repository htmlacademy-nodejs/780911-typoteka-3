"use strict";

const { Router } = require(`express`);
const articleAddRouter = new Router();
const { upload } = require(`../../helper`);
const addArticleValidator = require(`../middlewares/add-article-frontend-validator.js`);
const { pageTitles } = require("../../constants");
const moment = require("moment");
const api = require(`../api`).getAPI();
const wrap = require("async-middleware").wrap;

const emptyPost = {
  title: ``,
  announce: ``,
  fullText: ``,
  createdDate: moment(),
};
const type = pageTitles.newPost;

async function getCategories() {
  return await api.getCategories({ withCount: false });
}

articleAddRouter.get(
  `/`,
  wrap(async (req, res) => {
    const categoriesArr = await getCategories();

    res.render(`article-add`, {
      article: emptyPost,
      moment: require("moment"),
      type,
      pageTitle: type,
      categories: categoriesArr,
      action: `/articles/add`,
    });
  })
);

articleAddRouter.post(
  `/`,
  upload.single(`avatar`),
  addArticleValidator,
  wrap(async (req, res) => {
    const categoriesArr = await getCategories();
    try {
      await api.createPost({ data: req.body });

      res.redirect(`/my`);
    } catch (error) {
      res.render(`article-add`, {
        article: req.body,
        type,
        pageTitle: type,
        categories: categoriesArr,
        action: `/articles/add`,
        moment: require("moment"),
      });
    }
  })
);

module.exports = articleAddRouter;
