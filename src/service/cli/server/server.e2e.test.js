"use strict";

const request = require(`supertest`);
const {server} = require(`./server`);
const {readContentJSON, readContentTxt} = require(`../../../utils`);
const MOCK_FILE_PATH = `./mocks.json`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
let app;
let allOffersList;
beforeEach(async () => {
  app = await server();
  allOffersList = await readContentJSON(MOCK_FILE_PATH);
});

describe(`test api end-points`, () => {
  test(`When get books status code should be 200`, async () => {
    const res = await request(app).get(`/api/articles`);
    expect(res.statusCode).toBe(200);
  });

  test(`post new article return this article`, async () => {
    const data =   {
      title: `Борьба с прокрастинацией`,
      announce: ` Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.  Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?  Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.  Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
      fullText: ` Золотое сечение — соотношение двух величин, гармоническая пропорция.  Достичь успеха помогут ежедневные повторения.Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.Как начать действовать? Для начала просто соберитесь.  Вы можете достичь всего. Стоит только немного постараться и запастись книгами.  Это один из лучших рок-музыкантов.Он написал больше 30 хитов.Из под его пера вышло 8 платиновых альбомов.  Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.  Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.  Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.  Собрать камни бесконечности легко, если вы прирожденный герой.  Ёлки — это не просто красивое дерево. Это прочная древесина. Первая большая ёлка была установлена только в 1938 году.  Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.  Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?  Программировать не настолько сложно, как об этом говорят. Простые ежедневные упражнения помогут достичь успеха.`,
      category: [` Разное`]
    };
    const res = await request(app).post(`/api/articles`).send(data);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(data.title);
  });

  // test(`get the post from the list`, async () => {
  //   const res = await request(app).get(`/api/offers/${allOffersList[0][`id`]}`);
  //   const falseRes = await request(app).get(`/api/offers/hohoho`);
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.title).toBe(allOffersList[0].title);
  //   expect(res.body.sum).toBe(allOffersList[0].sum);
  //   expect(falseRes.statusCode).toBe(404);
  // });
  //
  // test(`edit the post from the list`, async () => {
  //   const data = {
  //     title: `hohoho`,
  //     category: [`hohoho`],
  //   };
  //   const res = await request(app)
  //     .put(`/api/offers/${allOffersList[0][`id`]}`)
  //     .send(data);
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.title).toBe(`hohoho`);
  // });
  //
  // test(`edit the post from the list with not correct data`, async () => {
  //
  //   const falsyData = {
  //     hohoho: `hohoho`,
  //     categories: [`hohoho`],
  //   };
  //
  //   const falseRes = await request(app)
  //     .put(`/api/offers/${allOffersList[0][`id`]}`)
  //     .send(falsyData);
  //
  //   expect(falseRes.statusCode).toBe(400);
  // });
  //
  // test(`delete the post from the list`, async () => {
  //   const res = await request(app).delete(
  //       `/api/offers/${allOffersList[0][`id`]}`
  //   );
  //   const falseRes = await request(app).delete(`/api/offers/hohoho`);
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.length).toBe(allOffersList.length - 1);
  //   expect(falseRes.statusCode).toBe(404);
  // });
  //
  // test(`get comments of post by it's id`, async () => {
  //   const res = await request(app).get(
  //       `/api/offers/${allOffersList[0][`id`]}/comments`
  //   );
  //   const falseRes = await request(app).get(`/api/offers/hohoho/comments`);
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.length).toBe(allOffersList[0][`comments`].length);
  //   expect(falseRes.statusCode).toBe(404);
  // });
  //
  // test(`delete comment of post by it's id`, async () => {
  //   const res = await request(app).delete(
  //       `/api/offers/${allOffersList[0][`id`]}/comments/${allOffersList[0][`comments`][0][`id`]}`
  //   );
  //   const falseRes = await request(app).delete(
  //       `/api/offers/${allOffersList[0][`id`]}/comments/${allOffersList[0][`comments`][0]}hohoho}`
  //   );
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body[`comments`].length).toBe(
  //       allOffersList[0][`comments`].length - 1
  //   );
  //   expect(falseRes.statusCode).toBe(404);
  // });
  //
  // test(`update comment of post by it's id`, async () => {
  //   const data = {
  //     text: `hohoho`,
  //   };
  //   const falsyData = {
  //     hohoho: `hohoho`,
  //   };
  //
  //   const res = await request(app)
  //     .post(`/api/offers/${allOffersList[0][`id`]}/comments/`)
  //     .send(data);
  //   const falseRes = await request(app)
  //     .post(`/api/offers/${allOffersList[0][`id`]}/comments/`)
  //     .send(falsyData);
  //
  //   expect(res.statusCode).toBe(200);
  //   expect(res.body[`comments`].length).toBe(
  //       allOffersList[0][`comments`].length + 1
  //   );
  //   expect(falseRes.statusCode).toBe(400);
  // });
  //
  // test(`search for offer by a title`, async () => {
  //   const data = encodeURI(allOffersList[0][`title`]);
  //   const falsyData = `hohoho`;
  //
  //   const res = await request(app).get(`/api/search?query=${data}`);
  //   const falseRes = await request(app).get(`/api/search?query=${falsyData}`);
  //
  //   expect(res.statusCode).toBe(200);
  //   expect(falseRes.statusCode).toBe(404);
  // });
  //
  // test(`return categories list`, async () => {
  //   const categories = await readContentTxt(FILE_CATEGORIES_PATH);
  //   const res = await request(app).get(`/api/categories`);
  //
  //   expect(res.statusCode).toBe(200);
  //
  //   expect(res.body).toStrictEqual(categories);
  // });
});
