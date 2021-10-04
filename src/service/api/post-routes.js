"use strict";

const { Router } = require(`express`);
const { HttpCode } = require(`../../HttpCode`);
const bodyParser = require(`body-parser`);
const jsonParser = bodyParser.json();
const articleExist = require("../middlewares/article-exist");
const { articleValidator } = require("../../express/middlewares/validator");
const { sendResponse } = require("../../utils");
const { articlePutValidator } = require("../../express/middlewares/validator");
const { formatPostToBD } = require("../lib/formatPosTtoBD");
module.exports = (app, postService, commentService) => {
  const router = new Router();

  app.use(`/articles`, router);

  router.get(`/`, async (req, res) => {
    const { limit, offset, userId, categoryId, withComments } = req.query;

    let posts = {};

    posts.current = await postService.findAll();
    return res.status(HttpCode.OK).json(posts);

    return res.status(HttpCode.OK).json(posts);
  });

  router.get(`/:articleId`, async (req, res) => {
    const { articleId } = req.params;

    console.log("src/service/api/post-routes.js", articleId);
    const post = await postService.findOne({ articleId });

    if (!post) {
      return res
        .status(HttpCode.NOT_FOUND)
        .send(`the article with id ${articleId} is not found`);
    }

    return res.status(HttpCode.OK).json(post);
  });

  router.post(`/`, jsonParser, articleValidator, async (req, res) => {
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

      console.log('found comment to delete:', comment);

      const deletedComment = await commentService.drop(
        articleId,
        commentId
      );

      if (!deletedComment) {
        return res.status(HttpCode.FORBIDDEN).send(`Forbidden`);
      }

      return res.status(HttpCode.OK).json(deletedComment);
    }
  );
};
