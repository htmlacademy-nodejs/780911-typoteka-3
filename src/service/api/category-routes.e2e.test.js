"use strict";

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);
const initDB = require(`../lib/init-db`);
const categoryRoute = require(`./category-routes`);
const CategoryService = require(`../data-service/category-service`);
const routes = require(`../api`);
const {
  HttpCode,
  API_PREFIX,
  mockCategories,
  mockPosts,
  mockAuthors,
  mockComments,
} = require("../../constants");

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
  categoryRoute(app, new CategoryService(mockDB));
  return app;
};

describe(`API GET category endpoint`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(`/category`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 3 categories`, () =>
    expect(response.body.length).toBe(3));

  test(`Category names are "Кино", "Разное", "Деревья"`, () =>
    expect(response.body.map((it) => it.name)).toEqual(
      expect.arrayContaining([`Кино`, `Разное`, `Деревья`])
    ));
});

describe(`API POST category endpoint `, () => {
  let app;
  let response;
  const data = { name: "hohoho2" };

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).post(`/category`).send(data);
  });

  test(`return status code 202`, () =>
    expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`returned name from created entry is equal to sent category name`, () =>
    expect(response.body.name).toBe(data.name));
});

describe(`API PUT category/:categoryId endpoint `, () => {
  let app;
  let response;
  const data = { name: "hohoho2" };

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).put(`/category/1`).send(data);
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`response body status of update is true`, () => {
    expect(response.body).toBe(true);
  });
});

test(`API PUT category/:categoryId with non-existing id`, async () => {
  const app = await createAPI();
  const data = { name: "hohoho2" };
  await request(app).put(`/category/16`).send(data).expect(HttpCode.NOT_FOUND);
});

describe(`API DELETE category/:categoryId endpoint `, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).delete(`/category/1`);
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`response body status of update is true`, () => {
    expect(response.body).toBe(true);
  });
});

test(`API DELETE category/:categoryId with non-existing id`, async () => {
  const app = await createAPI();
  await request(app).delete(`/category/9`).expect(HttpCode.NOT_FOUND);
});
