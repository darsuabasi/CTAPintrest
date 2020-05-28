-- DROP DATABASE IF EXISTS pintrest_db1;
-- CREATE DATABASE pintrest_db1;

-- \c pintrest_db1;

-- DROP TABLE IF EXISTS Users;
-- DROP TABLE IF EXISTS Boards;
-- DROP TABLE IF EXISTS Pins;
-- DROP TABLE IF EXISTS Tags;
-- DROP TABLE IF EXISTS Likes;


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

CREATE TABLE Pins (
    id SERIAL PRIMARY KEY,
    -- link VARCHAR UNIQUE,
    imageUrl VARCHAR,
    creator_id INT REFERENCES Users(id) ON DELETE CASCADE,
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
    creator_id INT REFERENCES Users(id) ON DELETE CASCADE,
    pin_id  INT REFERENCES Pins(id) ON DELETE CASCADE,
    board_id INT REFERENCES Boards(id) ON DELETE CASCADE,
    tag_name TEXT
);


CREATE TABLE Likes (
    id SERIAL PRIMARY KEY,
    liker_id INT REFERENCES Users(id) ON DELETE CASCADE,
    pin_id  INT REFERENCES Pins(id) ON DELETE CASCADE,
    CONSTRAINT UC_like UNIQUE (liker_id, pin_id)
);

INSERT INTO Users (username, first_name, last_name, bio, profilePic, email) 
    VALUES  ('xoxoDarsu', 'Uduakabasi', 'Abasiurua', 'City gal anyhow', 'https://holi.com','darsu@gmail.com'),
            ('e.jj', 'Eli', 'Jackson', 'Long Island serving looks', 'https://jiahPic.com','lijah@apple.org'),
            ('youLoveNai', 'Nai', 'Bennasy', 'Your best decision', 'https://naiPic.com', 'meshki@yahoo.com'),
            ('ayoApples', 'Apple', 'Deniro', 'I love apples', 'https://apples.com','apples@pursuit.org');

INSERT INTO Boards (board_name, board_description, creator_id)
    VALUES ('Summer Looks', 'This is my board filled with summer looks in nyc', 2),
           ('Face Beat', 'makeup inspo for bougie days', 1),
           ('Food recips', 'Trying these out when I get bored.', 2),
           ('Tatt Inspo', 'cool tatt ideas', 1);
           

INSERT INTO Pins (imageUrl, creator_id, board_id, note /*pin_image*/)
    VALUES  ('../../uploads/softGlamLook.jpeg', 1, 2, 'Soft Glam'),
            ('../../uploads/dioneFit.jpeg', 3, 1, 'Dress down with the AF1'),
            ('../../uploads/sesameNoodles.jpeg', 2, 3, 'Sesame noodles, yum'),
            ('../../uploads/legTattInspo.jpeg', 1, 4, 'Check out this leg tatt inspo');

INSERT INTO Tags (creator_id, pin_id, board_id, tag_name)
    VALUES (1, 1, 2, 'makeup'),
           (3, 2, 1, 'nike'),
           (2, 3, 3, 'food'),
           (1, 4, 4, 'tattoos'),
           (1, 4, 4, 'leg tatts'),
           (1, 4, 4, 'full leg tatto'),
           (2, 3, 3, 'sesame noodles'),
           (2, 3, 3, 'noodles'),
           (3, 2, 1, 'mint green'),
           (3, 2, 1, 'lace fit'),
           (3, 2, 1, 'dione style');

INSERT INTO Likes (liker_id, pin_id)
    VALUES (4, 1),
           (1, 2),
           (4, 3),
           (4, 4),
           (2, 1),
           (2, 2),
           (2, 3),
           (3, 4),
           (3, 1),
           (2, 4),
           (3, 2);
           