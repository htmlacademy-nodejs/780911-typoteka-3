'use strict';

const {Router} = require(`express`);
const searchRouter = new Router();

searchRouter.get(`/`, async (req, res) => {

  try {
    const {search} = req.body;
    console.log(`search`, search);

    res.render(`search-1`);
    // const results = await api.search(search);
    // res.render(`search-result`, {
    //   results
    // });
  } catch (error) {
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
