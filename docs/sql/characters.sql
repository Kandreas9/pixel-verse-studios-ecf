CREATE DATABASE IF NOT EXISTS pixelverse_mysql;
USE pixelverse_mysql;

CREATE TABLE characters (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NULL,
    name VARCHAR(50) NOT NULL UNIQUE,
    gender VARCHAR(50) NOT NULL,
    skin_color VARCHAR(50) NOT NULL,
    eye_color VARCHAR(50) NOT NULL,
    eye_shape VARCHAR(50) NOT NULL,
    hair_color VARCHAR(50) NOT NULL,
    nose_shape VARCHAR(50) NOT NULL,
    mouth_shape VARCHAR(50) NOT NULL,
    is_shared BOOLEAN NOT NULL DEFAULT FALSE,
    is_approved BOOLEAN NOT NULL DEFAULT FALSE,
    image VARCHAR(255) NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
);
