-- DROP DATABASE IF EXISTS pintrest_db;
-- CREATE DATABASE pintrest_db;

-- \c pintrest_db;

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
    -- counts TEXT,
    profilePic VARCHAR,	
    email VARCHAR UNIQUE
);

CREATE TABLE Boards (
    id SERIAL PRIMARY KEY,
    board_name TEXT,
    -- board_url TEXT,
    board_description TEXT,
    creator_id VARCHAR REFERENCES Users(id) ON DELETE CASCADE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- counts_data VARCHAR,
    board_image VARCHAR
    -- pin_amount INT
);

CREATE TABLE Pins (
    id SERIAL PRIMARY KEY,
    -- link VARCHAR UNIQUE,
    imageUrl VARCHAR,
    creator_id VARCHAR REFERENCES Users(id) ON DELETE CASCADE,
    board_id INT REFERENCES Boards(id) ON DELETE CASCADE,
    -- created_at VARCHAR, 
    note NCHAR(200),
    -- color TEXT, 
    -- counts TEXT,
    -- media TEXT,
    -- attribution,
    -- pin_image VARBINARY(max),
    -- metadata, 
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

