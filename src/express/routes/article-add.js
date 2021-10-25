"use strict";

const { Router } = require(`express`);
const articleAddRouter = new Router();
const { upload } = require(`../../helper`);
const addArticleValidator = require(`../middlewares/add-article-frontend-validator.js`);
const { pageTitles } = require("../../constants");
const moment = require("moment");
const api = require(`../api`).getAPI();

const emptyPost = {
  title: ``,
  announce: ``,
  fullText: ``,
  created_date: moment(),
};
const type = pageTitles.newPost;

async function getCategories() {
  return await api.getCategories({ withCount: false });
}

articleAddRouter.get(`/`, async (req, res) => {
  const categoriesArr = await getCategories();

  res.render(`article-add`, {
    article: emptyPost,
    moment: require( 'moment' ),
    type,
    pageTitle: type,
    categories: categoriesArr,
    action: `/articles/add`,
  });
});

articleAddRouter.post(
  `/`,
  upload.single(`avatar`),
  addArticleValidator,
  async (req, res) => {
    const categoriesArr = await getCategories();
    // // console.log("req.body on front ", req.body);
    try {
      await api.createPost({ data: req.body });

      res.redirect(`/my`);
    } catch (error) {
      // // console.log("GOT ERR", error);
      res.render(`article-add`, {
        article: req.body,
        type,
        pageTitle: type,
        categories: categoriesArr,
        action: `/articles/add`,
      });
    }
  }
);

module.exports = articleAddRouter;
