-- DROP DATABASE IF EXISTS pintrest_db1;
-- CREATE DATABASE pintrest_db1;

-- \c pintrest_db1;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Boards;
DROP TABLE IF EXISTS Pins;
DROP TABLE IF EXISTS Tags;
DROP TABLE IF EXISTS Likes;

CREATE TABLE Users (
    id VARCHAR PRIMARY KEY,
    username VARCHAR UNIQUE,
    first_name VARCHAR,
    last_name VARCHAR,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    profilePic VARCHAR,	
    email VARCHAR UNIQUE
);

CREATE TABLE Boards (
    id SERIAL PRIMARY KEY,
    board_name TEXT,
    board_description TEXT,
    creator_id VARCHAR REFERENCES Users(id) ON DELETE CASCADE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    board_image VARCHAR
);

CREATE TABLE Pins (
    id SERIAL PRIMARY KEY,
    imageUrl VARCHAR,
    creator_id VARCHAR REFERENCES Users(id) ON DELETE CASCADE,
    board_id INT REFERENCES Boards(id) ON DELETE CASCADE,
    note NCHAR(200),
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Tags (
    id SERIAL PRIMARY KEY,
    creator_id VARCHAR REFERENCES Users(id) ON DELETE CASCADE,
    pin_id  INT REFERENCES Pins(id) ON DELETE CASCADE,
    board_id INT REFERENCES Boards(id) ON DELETE CASCADE,
    tag_name TEXT
);

CREATE TABLE Likes (
    id SERIAL PRIMARY KEY,
    liker_id VARCHAR REFERENCES Users(id) ON DELETE CASCADE,
    pin_id  INT REFERENCES Pins(id) ON DELETE CASCADE,
    CONSTRAINT UC_like UNIQUE (liker_id, pin_id)
);

