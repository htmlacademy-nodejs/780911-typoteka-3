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
const {URL_LIST} = require("../helper");
const { articleValidator } = require("../express/middlewares/validator");
const { nanoid } = require(`nanoid`);
const ArticleKeys = [`title`, `announce`, `fullText`, `category`];
const { returnCategory } = require(`../helper`);
let now = new Date();
const emptyPost = {
  title: ``,
  announce: ``,
  fullText: ``,
  date: moment(now).format(`DD.MM.YYYY`),
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
  });
});

articleAddRouter.post(
  `/`,
  jsonParser,
  upload.single(`avatar`),
  articleValidator,
  async (req, res) => {
    const newArticle = req.body;

    newArticle.category = ``;
    delete newArticle.image;
    const { body, file } = req;

    if (Object.keys(res.locals.errorList).length) {
      console.log(`Caught Error on route`, res.locals.errorList);
      res.render(`article-add`, {
        article: req.body,
        type,
        pageTitle: type,
        category,
      });
    } else {
      axios
        .post(URL_LIST.ARTICLES, newArticle)
        .then((response) => {
          const data = response.data;
          res.redirect(`/my`);
        })
        .catch((err) => {
          const notValidArticle = {
            title: req.body.title,
            announce: req.body.announce,
            fullText: req.body.fullText,
            date: `21.04.2019`,
          };
          res.render(`article-add`, {
            article: emptyPost,
            type,
            pageTitle: type,
            category,
          });
          res.render(`404`, { pageTitle: type });
        });
    }
  }
);

module.exports = articleAddRouter;
