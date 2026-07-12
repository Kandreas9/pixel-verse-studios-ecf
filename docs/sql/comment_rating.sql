CREATE DATABASE IF NOT EXISTS pixelverse_mysql;
USE pixelverse_mysql;

CREATE TABLE comment_rating (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    comment_id BIGINT UNSIGNED NOT NULL,
    rating_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (comment_id) REFERENCES comments(id)
        ON DELETE CASCADE,
    FOREIGN KEY (rating_id) REFERENCES ratings(id)
        ON DELETE CASCADE
);
