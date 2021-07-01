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

//TODO: to add render of values of article =>https://stackoverflow.com/questions/42248892/how-can-i-display-the-value-of-my-textarea
editArticleByIdRoute.get(`/:articleId`, (req, res) => {

  axios.get(`http://localhost:3000/api/articles/${req.params.articleId}`, {timeout: 1000})
    .then((response) => {
      const data = response.data;
      console.log('Fetched Data', data);
      const fethedPost = {
        title: data.title,
        announce:data.announce,
        fullText:data.fullText,
        date: `21.04.2019`
      }
      res.render(`admin-add-new-post-empty`,  {article: fethedPost, type})
    })
    .catch((err) => {
      console.log(`Error: ${err.message}`);
    })

  // res.render(`admin-add-new-post-empty`, {article: emptyPost, type})
});

module.exports = editArticleByIdRoute;
