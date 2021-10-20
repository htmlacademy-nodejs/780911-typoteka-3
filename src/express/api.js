"use strict";

const axios = require(`axios`);
const TIMEOUT = 1000;
const { URL_LIST } = require(`../helper`);

class API {
  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout,
    });
  }

  async _load(url, options) {
    const response = await this._http.request({ url, ...options });
    return response.data;
  }

  getPosts({ offset, limit, withComments } = {}) {
    return this._load(`/articles`, { params: { limit, offset, withComments } });
  }

  getCategories({withCount}) {
    return this._load(`/category`, {params: {withCount}});
  }
}


const defaultAPI = new API(URL_LIST.DEFAULT, TIMEOUT);

module.exports = {
  API,
  getAPI: () => defaultAPI
};
