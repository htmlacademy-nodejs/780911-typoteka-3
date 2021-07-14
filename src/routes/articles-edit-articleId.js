'use strict';

const {Router} = require(`express`);
const editArticleByIdRoute = new Router();
const axios = require("axios");
const emptyPost = {
  title: ``,
  announce:``,
  fullText:``,
  date: `21.04.2019`
}

const type = `Редактирование публикации`;

editArticleByIdRoute.get(`/:articleId`, (req, res) => {

  axios.get(`http://localhost:3000/api/articles/${req.params.articleId}`, {timeout: 1000})
    .then((response) => {
      const data = response.data;
      const fethedPost = {
        title: data.title,
        announce:data.announce,
        fullText:data.fullText,
        date: `21.04.2019`
      }
      res.render(`admin-add-new-post-empty`,  {article: fethedPost, type})
    })
    .catch((err) => {
      res.render(`404`);
    })
});

editArticleByIdRoute.put(`/:articleId`, (req, res) => {

  axios.put(`http://localhost:3000/api/articles/${req.params.articleId}`, {timeout: 1000})
    .then((response) => {
      const data = response.data;
      const fethedPost = {
        title: data.title,
        announce:data.announce,
        fullText:data.fullText,
        date: `21.04.2019`
      }
      res.render(`admin-add-new-post-empty`,  {article: fethedPost, type})
    })
    .catch((err) => {
      res.render(`404`);
    })

  // res.render(`admin-add-new-post-empty`, {article: emptyPost, type})
});
module.exports = editArticleByIdRoute;
