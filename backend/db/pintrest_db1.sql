-- DROP DATABASE IF EXISTS pintrest_db1;
-- CREATE DATABASE pintrest_db1;

-- \c pintrest_db1;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Pins;

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE,
    first_name VARCHAR,
    last_name VARCHAR,
    bio TEXT,
    created_at TIMESTAMP,
    -- counts TEXT,
    profilePic VARCHAR,	
    email VARCHAR UNIQUE
);

CREATE TABLE Pins (
    id SERIAL PRIMARY KEY,
    -- link VARCHAR UNIQUE,
    imageUrl VARCHAR UNIQUE,
    creator_id INT REFERENCES Users(id) ON DELETE CASCADE,
    -- board TEXT,
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

CREATE TABLE Boards (
    id SERIAL PRIMARY KEY,
    board_name TEXT,
    -- board_url TEXT,
    board_description TEXT,
    creator_id INT REFERENCES Users(id) ON DELETE CASCADE,
    created_date TIMESTAMP
    -- counts_data VARCHAR,
    -- board_image VARBINARY(max)

);

INSERT INTO Users (username, first_name, last_name, bio, profilePic, email) 
    VALUES  ('xoxoDarsu', 'Uduakabasi', 'Abasiurua', 'City gal anyhow', 'https://holi.com','darsu@gmail.com'),
            ('e.jj', 'Eli', 'Jackson', 'Long Island serving looks', 'https://jiahPic.com','lijah@apple.org'),
            ('youLoveNai', 'Nai', 'Bennasy', 'Your best decision', 'https://naiPic.com', 'meshki@yahoo.com'),
            ('ayoApples', 'Apple', 'Deniro', 'I love apples', 'https://apples.com','apples@pursuit.org');
           

INSERT INTO Pins (imageUrl, creator_id, note /*pin_image*/)
    VALUES  ('../../uploads/softGlamLook.jpeg', 1, 'Soft Glam'),
            ('../../uploads/dioneFit.jpeg', 3, 'Dress down with the AF1'),
            ('../../uploads/sesameNoodles.jpeg', 1, 'Sesame noodles, yum'),
            ('../../uploads/legTattInspo.jpeg', 1, 'Check out this leg tatt inspo');

INSERT INTO Boards (board_name, /*board_url,*/ board_description, creator_id /*counts_data, board_image */)
    VALUES ('Summer Looks', 'This is my board filled with summer looks in nyc', 2 /*'image.jpeg'*/)
           


