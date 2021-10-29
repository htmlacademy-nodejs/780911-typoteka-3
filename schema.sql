CREATE TABLE categories(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(30) NOT NULL
);
CREATE TABLE authors(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  firstName varchar(255) NOT NULL,
  lastName varchar(255) NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  password_hash varchar(255) NOT NULL,
  avatar varchar(50)
);
CREATE TABLE posts(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title varchar(250) NOT NULL,
  createdDate timestamp NOT NULL,
  fullText text NOT NULL,
  announce text NOT NULL,
  avatar varchar(50),
  authorId integer NOT NULL,
  FOREIGN KEY (authorId) REFERENCES authors(id)
);
CREATE TABLE comments(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text text NOT NULL,
  createdDate timestamp NOT NULL,
  authorId integer NOT NULL,
  postId integer NOT NULL,
  FOREIGN KEY (authorId) REFERENCES authors(id),
  FOREIGN KEY (postId) REFERENCES posts(id)
);
CREATE TABLE posts_categories(
  postId integer NOT NULL,
  category_id integer NOT NULL,
  PRIMARY KEY (postId, category_id),
  FOREIGN KEY (postId) REFERENCES posts(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE INDEX ON posts (title);
