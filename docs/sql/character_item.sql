CREATE DATABASE IF NOT EXISTS pixelverse_mysql;
USE pixelverse_mysql;

CREATE TABLE character_item (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    character_id BIGINT UNSIGNED NOT NULL,
    item_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (character_id) REFERENCES characters(id)
        ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(id)
        ON DELETE CASCADE
);
