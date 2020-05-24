-- DROP DATABASE IF EXISTS pintrestmock_db;
-- CREATE DATABASE pintrestmock_db;

-- \c pintrestmock_db;

-- DROP TABLE IF EXISTS Users;
-- DROP TABLE IF EXISTS Pins;

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE,
    first_name VARCHAR,
    last_name VARCHAR,
    bio TEXT,
    created_at TIMESTAMP,
    counts TEXT,
    image VARCHAR,	
    email VARCHAR UNIQUE
);

CREATE TABLE Pins (
    id SERIAL PRIMARY KEY,
    link VARCHAR UNIQUE,
    url VARCHAR UNIQUE,
    creator INT REFERENCES Users(id) ON DELETE CASCADE,
    board TEXT,
    created_at VARCHAR, 
    note TEXT,
    color TEXT, 
    counts TEXT,
    media TEXT,
    -- attribution,
    image VARCHAR
    -- metadata, 
    -- time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Users (username, first_name, last_name, bio, created_at, counts, image, email) 
    VALUES ('darsuabasi', 'Dylan', 'Manganiello', 'hola hoes', 'ISO 8601', 'numOfPins', 'darsu@pursuit.org'),
           ('helloworld@pursuit.org');

INSERT INTO Pins (link, url, creator, board, created_at, note, color, counts, media, image)
    VALUES ('wwww.helloworld.com/hello', 'pintrest.com/hello9393', '1', 'NewbPins', 'ISO 8601', 'i love this pic', 'colorInHexFormat', 'numOfRepins', 'displaysImageOrVideo', 'image')
           
