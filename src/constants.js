"use strict";

const DEFAULT_COMMAND = `--help`;

const USER_ARGV_INDEX = 2;

const ExitCode = {
  error: 1,
  success: 0,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

const API_PREFIX = `/api`;

const MAX_ID_LENGTH = 6;

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`,
};

const pageTitles = {
  default: `Типотека`,
  newPost: `Новая публикация`,
  editPost: `Редактирование публикации`,
};

const POSTS_PER_PAGE = 8;

const HttpMethod = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

module.exports = {
  HttpMethod,
  POSTS_PER_PAGE,
  pageTitles,
  Env,
  MAX_ID_LENGTH,
  API_PREFIX,
  HttpCode,
  ExitCode,
  USER_ARGV_INDEX,
  DEFAULT_COMMAND
};
