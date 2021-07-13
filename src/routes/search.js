"use strict";

const { Router } = require(`express`);
const searchRouter = new Router();

searchRouter.get(`/`, async (req, res) => {
  console.log(`hi from search`);
  try {
    // const {search: searchValue} = req.body;
    // console.log(`req.body`, req.body);
    console.log(`req.query`, req.query);
    // console.log(`req.params`, req.params);
    res.render(`search-1`);
    // const results = await api.search(search);
    // res.render(`search-result`, {
    //   results
    // });
  } catch (error) {
    console.log(`search catch error`, error);
    res.render(`search-1`);
    // res.render(`search-result`, {
    //   results: []
    // });
  }

  // axios.post(URL_ARTICLES, newArticle)
  //   .then((response) => {
  //     const data = response.data;
  //     console.log('data: ', data);
  //     res.redirect(`my`);
  //   })
  //   .catch((err) => {
  //     res.render(`admin-add-new-post-empty`);
  //     console.log(`Error: ${err.message}`);
  //   })
});

module.exports = searchRouter;
