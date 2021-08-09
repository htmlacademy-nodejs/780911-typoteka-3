

/* fill authors table with data */
INSERT INTO authors (first_name, last_name, email, password_hash, avatar)
VALUES ('Сергей', 'Лукьяненко', 'metallica2@aaa.local', '1968-04-11', 'avatar-imag.02.png'),
       ('Джон', 'Резиг', 'metallica3@aaa.local', '1984-05-08', 'avatar-imag.03.png'),
       ('Артур Конан', 'Дойл', 'metallica4@aaa.local', '1859-05-22', 'avatar-imag.04.png'),
       ('Говард Филлипс', 'Лавкрафт', 'metallica5@aaa.local', '1890-08-20', 'avatar-imag.05.png'),
       ('Антон', 'Чехов', 'metallica6@aaa.local', '1860-01-29', 'avatar-imag.06.png');

/* fill posts table with data */
INSERT INTO posts (title, created_date, full_text, announce, picture, author_id)
VALUES ('Сергей', 'Лукьяненко', 'metallica2@aaa.local', '1968-04-11', 'avatar-imag.02.png'),
;
