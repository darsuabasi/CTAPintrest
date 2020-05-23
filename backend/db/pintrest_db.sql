DROP DATABASE IF EXISTS pintrestmock_db;
CREATE DATABASE pintrestmock_db;

\c pintrestmock_db;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Pins;

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR UNIQUE
);

CREATE TABLE Pins (
    id SERIAL PRIMARY KEY,
    poster_id INT REFERENCES users(id) ON DELETE CASCADE,
    imageURL VARCHAR,
    content TEXT,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Users (email) 
    VALUES ('darsu@pursuit.org'),
           ('helloworld@pursuit.org');

INSERT INTO Pins (poster_id, imageURL, content)
    VALUES ('1', 'je.png', 'hello newbie'),
           ('2', 'holi.png', 'air jordans');
