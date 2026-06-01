
CREATE DATABASE trade_system;
USE trade_system;

CREATE TABLE parties (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  mobile VARCHAR(15),
  whatsapp VARCHAR(15),
  alternate_mobile VARCHAR(15),
  opening_balance DECIMAL(10,2),
  deleted BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vendors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  mobile VARCHAR(15),
  whatsapp VARCHAR(15),
  alternate_mobile VARCHAR(15),
  opening_balance DECIMAL(10,2),
  deleted BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE agents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  mobile VARCHAR(15),
  whatsapp VARCHAR(15),
  alternate_mobile VARCHAR(15),
  opening_balance DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted BOOLEAN

);

CREATE TABLE commodities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(50),
  value VARCHAR(50),
  deleted BOOLEAN

);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_date DATE,
  agent_id INT,
  party_id INT,
  to_party VARCHAR(100),
  city VARCHAR(100),
  commodity_id INT,
  order_amount DECIMAL(15,2),
  delivery_charge DECIMAL(10,2),
  vendor_id INT,
  vendor_cost DECIMAL(10,2),
  payment_type INT,
  remark_mobile VARCHAR(20),
  remark_token VARCHAR(50),
  final_amount DECIMAL(15,2),
  my_charge DECIMAL(15,2),
  profit DECIMAL(15,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted BOOLEAN
);


CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  password VARCHAR(255),
  mobile VARCHAR(15),
  whatsapp VARCHAR(15),
  alternate_mobile VARCHAR(15),
  opening_balance DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted BOOLEAN
);