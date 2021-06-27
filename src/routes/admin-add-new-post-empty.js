'use strict';

const {Router} = require(`express`);
const adminAddNewPostEmptyRoute = new Router();
const bodyParser = require(`body-parser`);
const {articleValidator} = require("../express/middlewares/validator");
const jsonParser = bodyParser.urlencoded({extended: true});
const axios = require("axios");
const URL_ARTICLES = `http://localhost:3000/api/articles/`;
const UPLOAD_DIR = `../upload/img/`;
const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

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

adminAddNewPostEmptyRoute.get(`/`, (req, res) => {
  res.render(`admin-add-new-post-empty`)
});

adminAddNewPostEmptyRoute.post(`/`, jsonParser, upload.single(`avatar`), articleValidator, async (req, res) => {
  const newArticle = req.body;

  axios.post(URL_ARTICLES, newArticle)
    .then((response) => {
      const data = response.data;
      const {body, file} = req;
      // pict name is save in file.filename
      // picture: file.filename
      res.redirect(`my`);
    })
    .catch((err) => {
      res.render(`admin-add-new-post-empty`);
      console.log(`Error: ${err.message}`);
    })
  // 2 - перенаправление (redirect) на страницу «Мои объявления» (/my).

});

module.exports = adminAddNewPostEmptyRoute;
