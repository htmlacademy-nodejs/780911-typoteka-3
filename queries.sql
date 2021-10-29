/*Получить список всех категорий (идентификатор, наименование категории)*/

SELECT * FROM categories

/*Получить список категорий для которых создана минимум одна публикация (идентификатор, наименование категории);*/

SELECT DISTINCT ON (id)
 categories.id,
 categories.name
FROM categories
FULL JOIN posts_categories ON posts_categories.category_id = categories.id
 WHERE posts_categories.category_id >= 1


/*Получить список категорий с количеством публикаций (идентификатор, наименование категории, количество публикаций в категории);*/

SELECT
 categories.id,
 categories.name,
 COUNT (posts_categories.category_id)
FROM categories
FULL JOIN posts_categories ON posts_categories.category_id = categories.id
GROUP BY posts_categories.category_id, categories.id
ORDER BY
 posts_categories.category_id DESC;

/*Получить список публикаций (идентификатор публикации, заголовок публикации,
анонс публикации, дата публикации, имя и фамилия автора, контактный email,
количество комментариев, наименование категорий). Сначала свежие публикации;*/

SELECT posts.id,
posts.title,
posts.announce,
posts.createdDate,
authors.firstName,
authors.lastName,
authors.email,
COUNT(comments.postId) AS "comment_counts",
(SELECT string_agg(categories.name, ', ')
 FROM categories
 RIGHT JOIN posts_categories ON posts.id = posts_categories.postId
 AND categories.id = posts_categories.category_id
) AS "categories_ids"
FROM posts
INNER JOIN authors ON posts.authorId = authors.id
LEFT JOIN comments ON posts.id = comments.postId

GROUP BY posts.id, firstName, lastName, email

/*Получить полную информацию определённой публикации (идентификатор публикации,
 заголовок публикации, анонс, полный текст публикации, дата публикации,
 путь к изображению, имя и фамилия автора, контактный email,
 количество комментариев, наименование категорий);  В данном запросе это пост с id = 1*/

 SELECT
 posts.id,
 posts.title,
 posts.announce,
 posts.fullText,
 posts.createdDate,
 posts.picture,
 authors.firstName,
 authors.lastName,
 authors.email,
 COUNT(comments.postId),
 (SELECT string_agg(categories.name, ', ')
  FROM categories
  RIGHT JOIN posts_categories ON posts_categories.postId = posts.id
  AND posts_categories.category_id = categories.id
 )
 FROM posts
 LEFT JOIN authors on authors.id = posts.authorId
 LEFT JOIN comments on comments.postId = posts.id
 WHERE posts.id = 1
 GROUP BY posts.id, authors.firstName, authors.lastName, authors.email

/*Получить список из 5 свежих комментариев (идентификатор комментария,
идентификатор публикации, имя и фамилия автора, текст комментария);*/

SELECT
comments.createdDate,
comments.id,
comments.postId,
concat(authors.firstName, " ", authors.lastName) AS "authors name",
comments.text
FROM comments
LEFT JOIN authors ON authors.id = comments.authorId
ORDER BY comments.createdDate DESC
LIMIT 5;

/*Получить список комментариев для определённой публикации (идентификатор комментария,
 идентификатор публикации, имя и фамилия автора, текст комментария).
 Сначала новые комментарии; В данном запросе это пост с id = 1*/

SELECT
comments.id AS "comments id",
posts.id AS "posts id",
concat(authors.firstName, " ", authors.lastName) AS "authors name",
comments.text
FROM comments
LEFT JOIN authors ON authors.id = comments.authorId
LEFT JOIN posts ON posts.id = comments.postId
WHERE comments.postId = 1

/*Обновить заголовок определённой публикации на «Как я встретил Новый год»;
В данном запросе это пост с id = 1*/

UPDATE posts
  set title = "Как я встретил Новый год"
WHERE
  posts.id = 1;
