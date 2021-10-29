"use strict";

const axios = require(`axios`);
const TIMEOUT = 1000;
const { URL_LIST } = require(`../helper`);
const { HttpMethod } = require(`../constants`);

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

  getPostsByCategoryId({ offset, limit, id, withComments } = {}) {
    return this._load(`/articles/category/${id}`, {
      params: { limit, offset, withComments },
    });
  }

  getCategories({ withCount }) {
    return this._load(`/category`, { params: { withCount } });
  }

  search(searchValue) {
    return this._load(encodeURI(`/search?query=${searchValue}`));
  }

  getPostById({ id, withComments }) {
    return this._load(`/articles/${id}`, { params: { withComments } });
  }

  createPost({ data }) {
    return this._load(`/articles`, {
      method: HttpMethod.POST,
      data,
    });
  }

  putPost({ id, data }) {
    return this._load(`/articles/${id}`, {
      method: HttpMethod.PUT,
      data,
    });
  }
}

const defaultAPI = new API(URL_LIST.DEFAULT, TIMEOUT);

module.exports = {
  API,
  getAPI: () => defaultAPI,
};
