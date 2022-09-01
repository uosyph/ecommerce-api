CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity SMALLINT,
    order_id bigint REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    product_id bigint REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);