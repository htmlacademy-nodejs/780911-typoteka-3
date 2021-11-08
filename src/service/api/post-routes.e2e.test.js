"use strict";

const express = require(`express`);
const request = require(`supertest`);
const Sequelize = require(`sequelize`);
const initDB = require(`../lib/init-db`);
const postRoutes = require(`./post-routes`);
const {
  HttpCode,
  mockCategories,
  mockPosts,
  sendMockPost,
  sendBadMockPost,
  mockAuthors,
  mockComments,
  sendMockComment,
} = require("../../constants");
const {
  CategoryService,
  CommentService,
  PostService,
} = require("../data-service");

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
  postRoutes(
    app,
    new PostService(mockDB),
    new CommentService(mockDB),
    new CategoryService(mockDB)
  );
  return app;
};

describe(`API GET main endpoint /articles`, () => {
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

describe(`API GET one article endpoint /articles/:id`, () => {
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

test(`API GET one article endpoint /articles/:id wrong ID is passed`, async () => {
  const app = await createAPI();
  await request(app).get(`/articles/16`).expect(HttpCode.NOT_FOUND);
});

describe(`API GET /articles/category/:id`, () => {
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

test(`API GET /articles/category/:id wrong category ID is passed`, async () => {
  const app = await createAPI();
  await request(app).get(`/articles/16`).expect(HttpCode.NOT_FOUND);
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

test(`API POST to /articles/ not full filled post is passed`, async () => {
  const app = await createAPI();
  await request(app)
    .post(`/articles`)
    .send(sendBadMockPost)
    .expect(HttpCode.BAD_REQUEST);
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

test(`API PUT to /articles/:articleId with non-existing id`, async () => {
  const app = await createAPI();
  await request(app)
    .put(`/articles/16`)
    .send(sendMockPost)
    .expect(HttpCode.NOT_FOUND);
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

test(`API DELETE to /articles/:articleId with non-existing id`, async () => {
  const app = await createAPI();
  await request(app).delete(`/articles/56`).expect(HttpCode.NOT_FOUND);
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

  test(`article has 1 comment`, () => {
    expect(response.body.length).toBe(1);
  });
});

test(`API GET comments to /articles/:articleId/comments with non-existing id`, async () => {
  const app = await createAPI();
  await request(app).get(`/articles/56/comments`).expect(HttpCode.NOT_FOUND);
});

describe(`API POST comment to specific article to /articles/:articleId`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    const id = 1;
    response = await request(app)
      .post(`/articles/${id}/comments`)
      .send(sendMockComment);
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`Response body text to be equal to send data`, () => {
    expect(response.body.text).toBe(sendMockComment.text);
  });
});

test(`API POST comment to /articles/:articleId/comments with non-existing id`, async () => {
  const app = await createAPI();
  await request(app)
    .post(`/articles/87/comments`)
    .send(sendMockComment)
    .expect(HttpCode.NOT_FOUND);
});

describe(`API DELETE comment to specific article to /articles/:articleId`, () => {
  let app;
  let response;

  beforeAll(async () => {
    app = await createAPI();
    const id = 1;
    const commentId = 1;
    response = await request(app).delete(
      `/articles/${id}/comments/${commentId}`
    );
  });

  test(`Status code 200`, () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });
});

// here
test(`API DELETE comment to /articles/:articleId/comments with non-existing id`, async () => {
  const app = await createAPI();
  await request(app).delete(`/articles/87/comments`).expect(HttpCode.NOT_FOUND);
});
