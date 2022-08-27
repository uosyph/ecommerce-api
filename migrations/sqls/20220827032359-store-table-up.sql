CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(50),
    exp DATE,
    mfd DATE
);