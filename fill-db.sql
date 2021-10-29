/* fill authors table with data */
INSERT INTO authors (firstName, lastName, email, password_hash, avatar)
VALUES ('Сергей', 'Лукьяненко', 'metallica2@aaa.local', '1968-04-11', 'avatar-imag.02.png'),
       ('Джон', 'Резиг', 'metallica3@aaa.local', '1984-05-08', 'avatar-imag.03.png'),
       ('Артур Конан', 'Дойл', 'metallica4@aaa.local', '1859-05-22', 'avatar-imag.04.png'),
       ('Говард Филлипс', 'Лавкрафт', 'metallica5@aaa.local', '1890-08-20', 'avatar-imag.05.png'),
       ('Антон', 'Чехов', 'metallica6@aaa.local', '1860-01-29', 'avatar-imag.06.png');

/* fill posts table with data */
INSERT INTO posts (title, createdDate, fullText, announce, picture, authorId)
VALUES ('Ёлки. История деревьев', '2021-07-09 13:57:40', 'Ёлки — это не просто красивое дерево. Это прочная древесина. Первая большая ёлка была установлена только в 1938 году.', 'Ёлки — это не просто красивое дерево.', 'img.00.png', 1),
       ('Обзор новейшего смартфона', '2021-07-01 13:57:40', 'Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.', 'Вы можете достичь всего.', 'img.01.png', 2),
       ('Учим HTML и CSS', '2021-07-07 13:57:40', 'Золотое сечение — соотношение двух величин, гармоническая пропорция.Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.', 'Золотое сечение — соотношение двух величин, гармоническая пропорция.', 'img.04.png', 5);

/* fill comments table with data */
INSERT INTO comments (text, createdDate, authorId, postId)
VALUES ('Это где ж такие красоты?', '2021-08-09 13:59:40', 5, 1),
       ('Совсем немного...', '2021-08-01 13:59:40', 4, 2),
       ('Согласен с автором!', '2021-08-02 13:59:40', 3, 1),
       ('Мне кажется или я уже читал это где-то?', '2021-08-01 13:59:40', 5, 1),
       ('Хочу такую же футболку :-)', '2021-08-07 13:59:40', 4, 3),
       ('Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.', '2021-08-01 13:59:40', 1, 2),
       ('Плюсую, но слишком много буквы!', '2021-08-02 13:59:40', 5, 3);

/* fill categories table with data */
INSERT INTO categories (name)
VALUES  ('Деревья'),
        ('За жизнь'),
        ('Без рамки'),
        ('Разное'),
        ('IT');

/* fill posts_categories table with data */
INSERT INTO posts_categories (postId, category_id)
VALUES (1, 1),
       (2, 5),
       (3, 5),
       (3, 4),
       (2, 4),
       (1, 4),
       (1, 2);
