-- DROP DATABASE IF EXISTS pintrest_db;
-- CREATE DATABASE pintrest_db;

-- \c pintrest_db;

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
    created_date TIMESTAMP,
    -- counts_data VARCHAR,
    board_image VARCHAR
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

INSERT INTO Boards (board_name, board_description, creator_id, board_image)
    VALUES ('Summer Looks', 'This is my board filled with summer looks in nyc', 2, 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-547181482-1585870019.jpg?crop=0.593xw:1.00xh;0.0913xw,0&resize=640:*'),
           ('Face Beat', 'makeup inspo for bougie days', 1, 'https://i.pinimg.com/474x/93/13/59/9313590e57769fe9e9e9cefa051d9be8.jpg'),
           ('Food recips', 'Trying these out when I get bored.', 2, 'https://afrogistmedia.com/wp-content/uploads/2018/04/Screen-Shot-2018-04-22-at-6.28.38-PM.png'),
           ('Tatt Inspo', 'cool tatt ideas', 1, 'https://i.pinimg.com/236x/30/b8/8e/30b88e3f2f4902a1bfa0863659b6f12c.jpg');
           

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
           