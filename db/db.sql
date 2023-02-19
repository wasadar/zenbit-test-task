USE apidb;
CREATE TABLE IF NOT EXISTS messages
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(30) NOT NULL,
    user_email VARCHAR(30) NOT NULL,
    user_message TEXT NOT NULL
);