const URL_LIST = {
  ARTICLES: `http://localhost:3000/api/articles/`,
  CATEGORIES: `http://localhost:3000/api/categories/`,
};

const moment = require("moment");
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

const returnCurrentDate = (date = new Date()) => {
  return moment(date).format(`DD.MM.YYYY`);
};

module.exports = {
  returnCategory,
  returnCurrentDate,
  URL_LIST,
};
