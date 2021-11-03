"use strict";

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);
const initDB = require(`../lib/init-db`);
const categoryRoute = require(`./category-routes`);
const CategoryService = require(`../data-service/category-service`);
const { HttpCode, API_PREFIX } = require(`../../constants`);
const routes = require(`../api`);
const {mockCategories, mockPosts, mockAuthors, mockComments} = require("../../constants");

const mockDB = new Sequelize(`sqlite::memory:`, { logging: false });

const app = express();
app.use(express.json());
app.use(API_PREFIX, routes);


beforeAll(async () => {
  await initDB(mockDB, { categories: mockCategories, posts: mockPosts, comments: mockComments, authors: mockAuthors });
  categoryRoute(app, new CategoryService(mockDB));
});

describe(`API category endpoint`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/category`);
    console.log("hohoho", response.body);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 3 categories`, () =>
    expect(response.body.length).toBe(3));

  test(`Category names are "Кино", "Разное", "Деревья"`, () =>
    expect(response.body.map((it) => it.name)).toEqual(
      expect.arrayContaining([`Кино`, `Разное`, `Деревья`])
    ));
});
