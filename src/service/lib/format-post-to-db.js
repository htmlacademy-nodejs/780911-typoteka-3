"use strict";

const getCategories = (categories) => {

  return categories.map((category) => {
    return parseInt(category);
  });
};

const formatPostToDb = (postData) => {
  const adaptedPost = {
    title: postData.title,
    created_date: postData.created_date,
    full_text: postData.full_text,
    announce: postData.announce,
    avatar: postData.avatar,
    // author_id: postData.author_id,
    createdAt: postData.createdAt,
    updatedAt: postData.updatedAt,
    categories: getCategories(postData.categories),
  };

  return adaptedPost;
};

module.exports = {
  formatPostToBD: formatPostToDb,
};


