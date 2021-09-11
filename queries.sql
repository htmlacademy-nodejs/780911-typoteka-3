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
posts.created_date,
authors.first_name,
authors.last_name,
authors.email,
COUNT(comments.post_id) AS "comment_counts",
(SELECT string_agg(categories.name, ', ')
 FROM categories
 RIGHT JOIN posts_categories ON posts.id = posts_categories.post_id
 AND categories.id = posts_categories.category_id
) AS "categories_ids"
FROM posts
INNER JOIN authors ON posts.author_id = authors.id
LEFT JOIN comments ON posts.id = comments.post_id

GROUP BY posts.id, first_name, last_name, email

/*Получить полную информацию определённой публикации (идентификатор публикации,
 заголовок публикации, анонс, полный текст публикации, дата публикации,
 путь к изображению, имя и фамилия автора, контактный email,
 количество комментариев, наименование категорий);  В данном запросе это пост с id = 1*/

 SELECT
 posts.id,
 posts.title,
 posts.announce,
 posts.full_text,
 posts.created_date,
 posts.picture,
 authors.first_name,
 authors.last_name,
 authors.email,
 COUNT(comments.post_id),
 (SELECT string_agg(categories.name, ', ')
  FROM categories
  RIGHT JOIN posts_categories ON posts_categories.post_id = posts.id
  AND posts_categories.category_id = categories.id
 )
 FROM posts
 LEFT JOIN authors on authors.id = posts.author_id
 LEFT JOIN comments on comments.post_id = posts.id
 WHERE posts.id = 1
 GROUP BY posts.id, authors.first_name, authors.last_name, authors.email

/*Получить список из 5 свежих комментариев (идентификатор комментария,
идентификатор публикации, имя и фамилия автора, текст комментария);*/

SELECT
comments.created_date,
comments.id,
comments.post_id,
concat(authors.first_name, " ", authors.last_name) AS "authors name",
comments.text
FROM comments
LEFT JOIN authors ON authors.id = comments.author_id
ORDER BY comments.created_date DESC
LIMIT 5;

/*Получить список комментариев для определённой публикации (идентификатор комментария,
 идентификатор публикации, имя и фамилия автора, текст комментария).
 Сначала новые комментарии; В данном запросе это пост с id = 1*/

SELECT
comments.id AS "comments id",
posts.id AS "posts id",
concat(authors.first_name, " ", authors.last_name) AS "authors name",
comments.text
FROM comments
LEFT JOIN authors ON authors.id = comments.author_id
LEFT JOIN posts ON posts.id = comments.post_id
WHERE comments.post_id = 1

/*Обновить заголовок определённой публикации на «Как я встретил Новый год»;
В данном запросе это пост с id = 1*/

UPDATE posts
  set title = "Как я встретил Новый год"
WHERE
  posts.id = 1;
