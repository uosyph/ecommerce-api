REATE TABLE orders (
    id SERIAL PRIMARY KEY,
    quantity SMALLINT,
    status BOOLEAN,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);