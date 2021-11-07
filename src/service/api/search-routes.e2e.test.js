"use strict";

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);
const initDB = require(`../lib/init-db`);
const searchRoute = require(`./search-routes`);
const { SearchService } = require(`../data-service/`);
const {
  HttpCode,
  API_PREFIX,
  mockCategories,
  mockPosts,
  mockAuthors,
  mockComments,
} = require("../../constants");

const routes = require(`../api`);

const createAPI = async () => {
  const mockDB = new Sequelize(`sqlite::memory:`, { logging: false });
  await initDB(mockDB, {
    categories: mockCategories,
    posts: mockPosts,
    comments: mockComments,
    authors: mockAuthors,
  });
  const app = express();
  app.use(express.json());
  app.use(API_PREFIX, routes);
  searchRoute(app, new SearchService(mockDB));
  return app;
};

describe(`GET: /search | search for offer by a title`, () => {
  let response;

  beforeAll(async () => {
    const app = await createAPI();
    const searchData = encodeURIComponent(mockPosts[0].title);
    response = await request(app).get(`/search?query=${searchData}`);
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`find an article`, () => {
    expect(response.body[0].title).toBe(mockPosts[0].title);
  });
});

test(`404 is returned when the article is not found`, async () => {
  const app = await createAPI();
  await request(app)
    .get(`/api/search?query=${"hohoho"}`)
    .expect(HttpCode.NOT_FOUND);
});
