CREATE TABLE categories(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(30) NOT NULL
);
CREATE TABLE authors(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  password_hash varchar(255) NOT NULL,
  avatar varchar(50)
);
CREATE TABLE posts(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title varchar(250) NOT NULL,
  created_date timestamp NOT NULL,
  full_text text NOT NULL,
  announce text NOT NULL,
  picture varchar(50),
  author_id integer NOT NULL,
  FOREIGN KEY (author_id) REFERENCES authors(id)
);
CREATE TABLE comments(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text text NOT NULL,
  created_date timestamp NOT NULL,
  author_id integer NOT NULL,
  post_id integer NOT NULL,
  FOREIGN KEY (author_id) REFERENCES authors(id),
  FOREIGN KEY (post_id) REFERENCES posts(id)
);
CREATE TABLE posts_categories(
  post_id integer NOT NULL,
  category_id integer NOT NULL,
  PRIMARY KEY (post_id, category_id),
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE INDEX ON posts (title);
