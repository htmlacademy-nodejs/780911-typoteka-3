"use strict";

const getCategories = (categories) => {

  return categories.map((category) => {
    return parseInt(category, 10);
  });
};

const formatPostToDb = (postData) => {
  const adaptedPost = {
    title: postData.title,
    createdDate: postData.createdDate,
    fullText: postData.fullText,
    announce: postData.announce,
    avatar: postData.avatar,
    // authorId: postData.authorId,
    createdAt: postData.createdAt,
    updatedAt: postData.updatedAt,
    categories: getCategories(postData.categories),
  };

  return adaptedPost;
};

module.exports = {
  formatPostToBD: formatPostToDb,
};


