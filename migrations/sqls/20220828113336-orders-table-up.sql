CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status BOOLEAN,
    user_id REFERENCES users(id)
);