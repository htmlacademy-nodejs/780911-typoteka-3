const URL_LIST = {
  ARTICLES: `http://localhost:3000/api/articles/`,
  CATEGORIES: `http://localhost:3000/api/categories/`
}

const axios = require("axios");
const returnCategory = async () => {
  const category = axios
    .get(URL_LIST.CATEGORIES, { timeout: 1000 })
    .then((response) => {
      const data = response.data;
      return data;
    })
    .catch((err) => {
      return [];
    });
  return category;
};

module.exports = {
  returnCategory,
  URL_LIST
};
