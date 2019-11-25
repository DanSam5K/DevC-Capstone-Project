CREATE TABLE employees (
    ID SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    dateOfBirth timestamp
);

CREATE TABLE articles (
    ID SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    article TEXT NOT NULL,
    datePosted timestamp
);

INSERT INTO employees (firstname, lastname, username, email, password, dateOfBirth)
VALUES  ('J.K. Rowling', 'Harry Potter', 'Harry', 'harry@harry.com', 'harrstoge', '1990/03/02');

INSERT INTO articles (title, article, datePosted)
VALUES ('J.K. Row', 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum', '2003/05/03');