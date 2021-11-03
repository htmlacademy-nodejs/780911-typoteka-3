"use strict";

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);
const initDB = require(`../lib/init-db`);
const postRoutes = require(`./post-routes`);
const { CommentService, PostService } = require(`../data-service/`);
const { HttpCode, API_PREFIX } = require(`../../constants`);
const {
  mockCategories,
  mockPosts,
  sendMockPost,
  mockAuthors,
  mockComments,
} = require("../../constants");
const { CategoryService } = require("../data-service");
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
  postRoutes(
    app,
    new PostService(mockDB),
    new CommentService(mockDB),
    new CategoryService(mockDB)
  );
  return app;
};

describe(`API main endpoint GET /articles`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(`/articles`);
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`Returns a list of 2 articles`, () => {
    expect(response.body.length).toBe(2);
  });
});

describe(`API one article endpoint /articles/:id`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(`/articles/1`);
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`title is same as mock title`, () => {
    expect(response.body.title).toBe(mockPosts[0].title);
  });

  test(`announce is same as mock announce`, () => {
    expect(response.body.announce).toBe(mockPosts[0].announce);
  });
});

describe(`API /articles/category/:id`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).get(`/articles/category/1`);
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`category name be equal to mock category name`, () => {
    expect(response.body.category.name).toBe(mockCategories[0]);
  });

  test(`other categories length be equal to mock categories length`, () => {
    expect(response.body.otherCategories.length).toBe(mockCategories.length);
  });
});

describe(`API POST to /articles/`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).post(`/articles`).send(sendMockPost);
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`response body title to equal to sent post title`, () => {
    expect(response.body.title).toBe(sendMockPost.title);
  });

  test(`response body announce to equal to sent post announce`, () => {
    expect(response.body.announce).toBe(sendMockPost.announce);
  });
});

describe(`API PUT to /articles/:articleId`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    response = await request(app).put(`/articles/1`).send(sendMockPost);
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`response body status of update is true`, () => {
    expect(response.body).toBe(true);
  });
});

describe(`API DELETE to /articles/:articleId`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    const id = 1;
    response = await request(app).delete(`/articles/${id}`);
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`response body status of delete is true`, () => {
    expect(response.body).toBe(true);
  });
});

describe(`API GET comments to specific article to /articles/:articleId`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    const id = 1;
    response = await request(app).get(`/articles/${id}/comments`);
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });
});
