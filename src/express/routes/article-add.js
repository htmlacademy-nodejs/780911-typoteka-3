"use strict";

const { Router } = require(`express`);
const articleAddRouter = new Router();
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.urlencoded({ extended: true });
const axios = require(`axios`);
const { URL_LIST, returnCurrentDate, upload } = require(`../../helper`);
const addArticleValidator = require(`../middlewares/add-article-frontend-validator.js`);
const {pageTitles} = require("../../constants");

let now = returnCurrentDate();
const emptyPost = {
  title: ``,
  announce: ``,
  fullText: ``,
  created_date: now,
};
const type = pageTitles.newPost;

async function getCategories() {
  try {
    const { data: response } = await axios.get(URL_LIST.CATEGORIES, {
      params: { withCount: false },
    });
    return response;
  } catch (error) {
    return error;
  }
}

articleAddRouter.get(`/`, async (req, res) => {
  const categoriesArr = await getCategories();

  res.render(`article-add`, {
    article: emptyPost,
    type,
    pageTitle: type,
    categories: categoriesArr,
    action: `/articles/add`,
  });
});

articleAddRouter.post(
  `/`,
  jsonParser,
  upload.single(`avatar`),
  addArticleValidator,
  async (req, res) => {
    const newArticle = req.body;
    const categoriesArr = await getCategories();

    if (Object.keys(res.locals.errorList).length) {
      console.log('GOT ERR', res.locals.errorList);
      res.render(`article-add`, {
        article: newArticle,
        type,
        pageTitle: type,
        categories: categoriesArr,
        action: `/articles/add`,
      });
    } else {
      axios
        .post(URL_LIST.ARTICLES, newArticle)
        .then(() => {
          res.redirect(`/my`);
        })
        .catch((err) => {
          console.log('Catch err on axios', err);
          res.render(`article-add`, {
            article: emptyPost,
            type,
            pageTitle: type,
            categories: categoriesArr,
            action: `/articles/add`,
          });
        });
    }
  }
);

module.exports = articleAddRouter;
