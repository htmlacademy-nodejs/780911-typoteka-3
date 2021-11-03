"use strict";

const { Router } = require(`express`);
const { HttpCode } = require(`../../http-code`);
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.json();
const articleExist = require("../middlewares/article-exist");
const { articleBackEndValidator } = require("../middlewares/validator");
const { formatPostToBD } = require("../lib/format-post-to-db");
module.exports = (app, postService, commentService, CategoryService) => {
  const router = new Router();

  app.use(`/articles`, router);

  router.get(`/`, async (req, res) => {
    const { offset, limit, withComments } = req.query;

    let posts;

    if (limit || offset) {
      posts = await postService.findPage({
        limit,
        offset,
      });
    } else {
      posts = await postService.findAll({ withComments });
    }

    return res.status(HttpCode.OK).json(posts);
  });

  router.get(`/:articleId`, async (req, res) => {
    const { articleId } = req.params;
    const { withComments } = req.query;
    const post = await postService.findOne({ articleId, withComments });

    if (!post) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`the article with id ${articleId} is not found`);
    }

    return res.status(HttpCode.OK).json(post);
  });

  router.get(`/category/:id`, async (req, res) => {
    const { id } = req.params;
    const { offset, limit, withComments } = req.query;

    let data;

    if (limit || offset) {
      data = await CategoryService.findPage({
        id,
        limit,
        offset,
      });
    } else {
      data = await postService.findByCategory({
        id,
        withComments,
      });
    }

    const category = await CategoryService.findOne(id);
    const otherCategories = await CategoryService.findAll(true);
    if (!data) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`the article with id ${id} is not found`);
    }

    return res.status(HttpCode.OK).json({
      category,
      otherCategories,
      posts: data.posts,
      count: data.count,
    });
  });

  router.post(`/`, jsonParser, articleBackEndValidator, async (req, res) => {
    const formattedPost = formatPostToBD(req.body);
    const data = await postService.create(formattedPost);
    return res.json(data);
  });

  router.put(`/:articleId`, jsonParser, async (req, res) => {
    const { articleId } = req.params;
    const updated = await postService.update({ id: articleId, post: req.body });

    if (!updated) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`the article with id ${articleId} is not found`);
    }
    return res.status(HttpCode.OK).json(updated);
  });

  router.delete(`/:articleId`, async (req, res) => {
    const { articleId } = req.params;
    const post = await postService.findOne({ articleId });

    if (!post) {
      return res.status(HttpCode.NOT_FOUND).send(`Not found`);
    }

    const deletedPost = await postService.drop({ id: articleId });

    if (!deletedPost) {
      return res.status(HttpCode.FORBIDDEN).send(`Forbidden`);
    }

    return res.status(HttpCode.OK).json(deletedPost);
  });

  router.get(
    `/:articleId/comments`,
    articleExist(postService),
    async (req, res) => {
      const { articleId } = req.params;

      const comments = await commentService.findAll(articleId);

      res.status(HttpCode.OK).json(comments);
    }
  );

  router.post(
    `/:articleId/comments`,
    articleExist(postService),
    async (req, res) => {
      const { articleId } = req.params;

      const comment = await commentService.create(articleId, req.body);

      return res.status(HttpCode.OK).json(comment);
    }
  );

  router.delete(
    `/:articleId/comments/:commentId`,
    articleExist(postService),
    async (req, res) => {
      const { articleId, commentId } = req.params;

      const comment = await commentService.findOne(commentId, articleId);

      if (!comment) {
        return res.status(HttpCode.NOT_FOUND).send(`Not found`);
      }

      const deletedComment = await commentService.drop(articleId, commentId);

      if (!deletedComment) {
        return res.status(HttpCode.FORBIDDEN).send(`Forbidden`);
      }

      return res.status(HttpCode.OK).json(deletedComment);
    }
  );
};
