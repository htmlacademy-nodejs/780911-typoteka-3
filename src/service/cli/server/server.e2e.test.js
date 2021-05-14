"use strict";

const request = require(`supertest`);
const { server } = require(`./server`);
const { readContentJSON, readContentTxt } = require(`../../../utils`);
const MOCK_FILE_PATH = `./mocks.json`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
let app;
let allArticlesList;
beforeEach(async () => {
  app = await server();
  allArticlesList = await readContentJSON(MOCK_FILE_PATH);
});

describe(`test api end-points`, () => {
  test(`GET: /articles | When get books status code should be 200`, async () => {
    const res = await request(app).get(`/api/articles`);
    expect(res.statusCode).toBe(200);
  });

  test(`POST: /articles | post new article return this article`, async () => {
    const data = {
      title: `Борьба с прокрастинацией`,
      announce: ` Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.  Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?  Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.  Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
      fullText: ` Золотое сечение — соотношение двух величин, гармоническая пропорция.  Достичь успеха помогут ежедневные повторения.Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.Как начать действовать? Для начала просто соберитесь.  Вы можете достичь всего. Стоит только немного постараться и запастись книгами.  Это один из лучших рок-музыкантов.Он написал больше 30 хитов.Из под его пера вышло 8 платиновых альбомов.  Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.  Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.  Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.  Собрать камни бесконечности легко, если вы прирожденный герой.  Ёлки — это не просто красивое дерево. Это прочная древесина. Первая большая ёлка была установлена только в 1938 году.  Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.  Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?  Программировать не настолько сложно, как об этом говорят. Простые ежедневные упражнения помогут достичь успеха.`,
      category: [` Разное`],
    };
    const res = await request(app).post(`/api/articles`).send(data);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(data.title);
  });

  test(`GET: /categories | get categories list`, async () => {
    const res = await request(app).get(`/api/categories`);
    const categories = await readContentTxt(FILE_CATEGORIES_PATH);
    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual(categories);
  });

  test(`GET: /articles/:articleId | get the article from the list by it's ID`, async () => {
    const res = await request(app).get(
      `/api/articles/${allArticlesList[0][`id`]}`
    );
    const falseRes = await request(app).get(`/api/articles/hohoho`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(allArticlesList[0].title);
    expect(res.body.announce).toBe(allArticlesList[0].announce);
    expect(falseRes.statusCode).toBe(404);
  });

  test(`PUT: /articles/:articleId | edit the article from the list`, async () => {
    const data = {
      title: `hohoho`,
      category: [`hohoho`],
    };
    const falsyData = {
      hohoho: `hohoho`,
      categories: [`hohoho`],
    };

    const res = await request(app)
      .put(`/api/articles/${allArticlesList[0][`id`]}`)
      .send(data);

    const falseRes = await request(app)
      .put(`/api/offers/${allArticlesList[0][`id`]}`)
      .send(falsyData);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(`hohoho`);
    expect(falseRes.statusCode).toBe(404);
  });

  test(`DELETE: /articles/:articleId | delete the article from the list`, async () => {
    const res = await request(app).delete(
      `/api/articles/${allArticlesList[0][`id`]}`
    );
    const falseRes = await request(app).delete(`/api/articles/hohoho`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(allArticlesList.length - 1);
    expect(falseRes.statusCode).toBe(404);
  });

  test(`DELETE: /articles/:articleId/comments/:commentId | delete comment of article by it's id`, async () => {
    const res = await request(app).delete(
      `/api/articles/${allArticlesList[0][`id`]}/comments/${
        allArticlesList[0][`comments`][0][`id`]
      }`
    );
    const falseRes = await request(app).delete(
      `/api/articles/${allArticlesList[0][`id`]}/comments/${
        allArticlesList[0][`comments`][0]
      }hohoho}`
    );

    expect(res.statusCode).toBe(200);
    expect(res.body[`comments`].length).toBe(
      allArticlesList[0][`comments`].length - 1
    );
    expect(falseRes.statusCode).toBe(404);
  });

  test(`POST: /articles/:articleId/comments | update comment of post by it's id`, async () => {
    const data = {
      text: `hohoho`,
    };
    const falsyData = {
      hohoho: `hohoho`,
    };

    const res = await request(app)
      .post(`/api/articles/${allArticlesList[0][`id`]}/comments/`)
      .send(data);
    const falseRes = await request(app)
      .post(`/api/articles/${allArticlesList[0][`id`]}/comments/`)
      .send(falsyData);

    expect(res.statusCode).toBe(200);
    expect(res.body[`comments`].length).toBe(
      allArticlesList[0][`comments`].length + 1
    );
    expect(falseRes.statusCode).toBe(400);

  });

  test(`GET: /search | search for offer by a title`, async () => {
    const data = encodeURI(allArticlesList[0][`title`]);
    const falsyData = `hohoho`;

    const res = await request(app).get(`/api/search?query=${data}`);
    const falseRes = await request(app).get(`/api/search?query=${falsyData}`);

    expect(res.statusCode).toBe(200);
    expect(falseRes.statusCode).toBe(404);
  });

});
