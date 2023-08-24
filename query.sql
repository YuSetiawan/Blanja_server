-- Active: 1689169208636@@127.0.0.1@5432@authentication


CREATE TABLE users(
    id VARCHAR PRIMARY KEY,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    fullname VARCHAR,
    role VARCHAR,
    phone VARCHAR,
    store_name VARCHAR
);
ALTER TABLE users ALTER COLUMN phone TYPE VARCHAR;


CREATE TABLE product(
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    stock INT NOT NULL,
    price INT NOT NULL,
    photo VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
);


CREATE TABLE category(
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE order_table (
    id VARCHAR PRIMARY KEY,
    product_id VARCHAR NOT NULL,
    quantity INT NOT NULL,
    order_date TIMESTAMP NOT NULL,
    users_id VARCHAR,
    product_size VARCHAR,
);

CREATE TABLE address (
    id VARCHAR PRIMARY KEY,
    name VARCHAR(50), 
    address_as VARCHAR(250), 
    address VARCHAR(250), 
    phone VARCHAR(20), 
    postal_code VARCHAR(10), 
    city VARCHAR(50) 
);

ALTER TABLE shipping_address RENAME TO address;


INSERT INTO address (name, address_as, address, phone, postal_code, city)
VALUES ('John Doe', 'home', '123 Main Street', '123-456-7890', '12345', 'Cityville');


ALTER TABLE product
ADD category_id INT;

ALTER TABLE product
ADD CONSTRAINT users_id FOREIGN KEY (users_id) REFERENCES users (id);

SELECT * FROM PRODUCT;
SELECT * FROM users;
SELECT * FROM order_table;
SELECT * FROM category;




-- Menambahkan kolom baru 'users_id' ke tabel 'order_table'
ALTER TABLE address
ADD COLUMN users_id VARCHAR;

-- Menambahkan foreign key pada kolom 'users_id' yang merujuk ke kolom 'id' pada tabel 'users'
ALTER TABLE order_table
ADD CONSTRAINT fk_order_users
FOREIGN KEY (users_id) REFERENCES users(id);

ALTER TABLE order_table
DROP COLUMN payment_status ;

ALTER TABLE product
ADD users_id INT;

ALTER TABLE order_table
ADD product_size VARCHAR;

ALTER TABLE order_table
ADD payment_status BOOLEAN DEFAULT false;




ALTER TABLE order_table
ADD users_id VARCHAR;

ALTER TABLE order_table
ADD product_id VARCHAR;

ALTER TABLE order_table
ALTER COLUMN product_id TYPE INTEGER USING product_id::integer;




