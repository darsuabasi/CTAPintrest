DROP DATABASE IF EXISTS pintrest_db1;
CREATE DATABASE pintrest_db1;

-- \c pintrest_db1;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Pins;

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    -- username VARCHAR UNIQUE,
    -- first_name VARCHAR,
    -- last_name VARCHAR,
    bio TEXT,
    -- created_at TIMESTAMP,
    -- counts TEXT,
    -- image VARCHAR,	
    email VARCHAR UNIQUE
);

CREATE TABLE Pins (
    id SERIAL PRIMARY KEY,
    -- link VARCHAR UNIQUE,
    -- url VARCHAR UNIQUE,
    creator_id INT REFERENCES Users(id) ON DELETE CASCADE,
    -- board TEXT,
    -- created_at VARCHAR, 
    note TEXT,
    -- color TEXT, 
    -- counts TEXT,
    -- media TEXT,
    -- attribution,
    -- image VARCHAR
    -- metadata, 
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Users (email) 
    VALUES  ('darsu@gmail.com'),
            ('yellowdiamonds@apple.org'),
            ('meshki@yahoo.com'),
            ('apples@pursuit.org');
           

INSERT INTO Pins (creator_id, note)
    VALUES  ('1', 'Soft Glam'),
            ('3', 'Dress down with the AF1'),
            ('1', 'Lemon pepper wings recipe'),
            ('1', 'Summer fit');
           



