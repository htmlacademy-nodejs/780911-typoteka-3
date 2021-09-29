"use strict";

const getCategories = (categories) => {
  // return categories.map((category) => ({
  //   id: parseInt(category.id),
  //   name: category.name,
  // }));

  return categories.map((category) => {
    return parseInt(category);
  });
};

const formatPostToBD = (postData) => {
  const adaptedPost = {
    title: postData.title,
    created_date: postData.created_date,
    full_text: postData.full_text,
    announce: postData.announce,
    avatar: postData.avatar,
    author_id: postData.author_id,
    createdAt: postData.createdAt,
    updatedAt: postData.updatedAt,
    categories: getCategories(postData.categories),
  };

  return adaptedPost;
};

module.exports = {
  formatPostToBD,
};

// const cat = {
//   "categories": [
//     { "id": "5", "name": "IT" },
//     { "id": "1", "name": "Деревья" },
//     { "id": "8", "name": "Программирование" },
//     { "id": "9", "name": "Железо" },
//     { "id": "4", "name": "Разное" },
//     { "id": "6", "name": "Музыка" },
//   ],
// };

// const cat = {
//   "categories": ["5", "1", "8", "9", "4", "6"],
// };
