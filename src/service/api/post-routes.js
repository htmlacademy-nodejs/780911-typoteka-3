"use strict";

const { Router } = require(`express`);
const { HttpCode } = require(`../../HttpCode`);
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.json();
const articleExist = require("../middlewares/article-exist");
const { articleBackEndValidator } = require("../middlewares/validator");
const { formatPostToBD } = require("../lib/formatPosTtoBD");
module.exports = (app, postService, commentService, CategoryService) => {
  const router = new Router();

  app.use(`/articles`, router);

  router.get(`/`, async (req, res) => {
    const { withComments } = req.query;

    let posts = {};

    posts.current = await postService.findAll({ withComments });
    return res.status(HttpCode.OK).json(posts);

    return res.status(HttpCode.OK).json(posts);
  });

  router.get(`/:articleId`, async (req, res) => {
    const { articleId } = req.params;
    const { withComments } = req.query;
    console.log("src/service/api/post-routes.js", articleId);
    const post = await postService.findOne({ articleId, withComments });

    console.log("post on backEnd", post);
    if (!post) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`the article with id ${articleId} is not found`);
    }

    return res.status(HttpCode.OK).json(post);
  });

  router.get(`/category/:id`, async (req, res) => {
    const { id } = req.params;
    const { withComments } = req.query;
    console.log("POST ROUTES category/:", id);
    const posts = await postService.findByCategory({ id, withComments });
    const categoryName = await CategoryService.findOne(id);
    const otherCategories = await CategoryService.findAll(true);
    if (!posts) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`the article with id ${id} is not found`);
    }

    return res
      .status(HttpCode.OK)
      .json({ category: categoryName, otherCategories, posts });
  });

  router.post(`/`, jsonParser, articleBackEndValidator, async (req, res) => {
    const formattedPost = formatPostToBD(req.body);
    console.log("formattedPost", formattedPost);
    const data = await postService.create(formattedPost);
    return res.json(data);
  });

  router.put(`/:articleId`, jsonParser, async (req, res) => {
    const { articleId } = req.params;
    const updated = await postService.update({ id: articleId, post: req.body });

    console.log("updated", updated);
    if (!updated) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`the article with id ${articleId} is not found`);
    }
    return res.status(HttpCode.OK).json(updated);
  });

  router.delete(`/:articleId`, async (req, res) => {
    const { postId } = req.params;
    console.log("router.delete /:articleId/", postId);
    const post = await postService.findOne({ postId });

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

      console.log("src/service/api/post-routes.js: articleId", articleId);
      const comments = await commentService.findAll(articleId);

      console.log("comments", comments);
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

      console.log("found comment to delete:", comment);

      const deletedComment = await commentService.drop(articleId, commentId);

      if (!deletedComment) {
        return res.status(HttpCode.FORBIDDEN).send(`Forbidden`);
      }

      return res.status(HttpCode.OK).json(deletedComment);
    }
  );
};
