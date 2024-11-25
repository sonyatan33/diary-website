CREATE DATABASE diary_website_db;
USE diary_website_db;

CREATE TABLE diary_content (
    id integer PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content_desc TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO diary_content (title, content_desc)
VALUES 
('My first diary', 'Welcome to my first diary!')
