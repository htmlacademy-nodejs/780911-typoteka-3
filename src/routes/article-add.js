"use strict";

const moment = require("moment");
const { Router } = require(`express`);
const articleAddRouter = new Router();
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.urlencoded({ extended: true });
const axios = require("axios");
const UPLOAD_DIR = `../upload/img/`;
const multer = require(`multer`);
const path = require(`path`);
const { URL_LIST, returnCurrentDate } = require("../helper");
const { articleValidator } = require("../express/middlewares/validator");
const { nanoid } = require(`nanoid`);
const ArticleKeys = [`title`, `announce`, `fullText`, `category`];
const { returnCategory } = require(`../helper`);
let now = returnCurrentDate();
const emptyPost = {
  title: ``,
  announce: ``,
  fullText: ``,
  date: now,
};
const type = `Новая публикация`;
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  },
});

const upload = multer({ storage });

articleAddRouter.get(`/`, async (req, res) => {
  res.render(`article-add`, {
    article: emptyPost,
    type,
    pageTitle: type,
    category: await returnCategory(),
    action: `/articles/add`
  });
});

articleAddRouter.post(
  `/`,
  jsonParser,
  upload.single(`avatar`),
  articleValidator,
  async (req, res) => {
    const newArticle = req.body;
    const categoryList = await returnCategory();
    newArticle.category = ``;
    delete newArticle.image;
    const { body, file } = req;

    if (Object.keys(res.locals.errorList).length) {

      res.render(`article-add`, {
        article: req.body,
        type,
        pageTitle: type,
        category: req.body.category.length
          ? req.body.category
          : categoryList,
        action: `/articles/add`
      });
    } else {

      axios
        .post(URL_LIST.ARTICLES, newArticle)
        .then((response) => {
          const data = response.data;
          res.redirect(`/my`);
        })
        .catch((err) => {
          res.render(`article-add`, {
            article: emptyPost,
            type,
            pageTitle: type,
            category : categoryList,
            action: `/articles/add`
          });
        });
    }
  }
);

module.exports = articleAddRouter;
