'use strict';

const {Router} = require(`express`);
const articleAddRouter = new Router();
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.urlencoded({extended: true});
const axios = require("axios");
const URL_ARTICLES = `http://localhost:3000/api/articles/`;
const UPLOAD_DIR = `../upload/img/`;
const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);
const ArticleKeys = [`title`, `announce`, `fullText`, `category`];
const emptyPost = {
  title: ``,
  announce:``,
  fullText:``,
  date: `21.04.2019`
}
const type = `Новая публикация`;
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

articleAddRouter.get(`/`, (req, res) => {
  res.render(`article-add`, {article: emptyPost, type})
});

articleAddRouter.post(`/`, jsonParser, upload.single(`avatar`), async (req, res) => {
  const newArticle = req.body;

  newArticle.category = ``;
  delete newArticle.image;
  const keys = Object.keys(newArticle);
  const keysExists = ArticleKeys.every((key) => keys.includes(key));
  const {body, file} = req;

  if (!keysExists) {
    res.render(`admin-add-new-post-empty`, {article: emptyPost, type});
  } else {
    axios.post(URL_ARTICLES, newArticle)
      .then((response) => {
        const data = response.data;
        res.redirect(`/my`);
      })
      .catch((err) => {
        //{ title: 'dd', announce: 'dd', fullText: 'dd', category: '' }
        const notValidArticle = {
          title: req.body.title,
          announce:req.body.announce,
          fullText:req.body.fullText,
          date: `21.04.2019`
        }
        res.render(`admin-add-new-post-empty`, {article: emptyPost, type});
        res.render(`404`);
      })
  }

});

module.exports = articleAddRouter;