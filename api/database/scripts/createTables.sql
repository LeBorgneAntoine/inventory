CREATE TABLE IF NOT EXISTS Company (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    logoURL TEXT
);
CREATE TABLE IF NOT EXISTS Product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoryID TEXT,
    companyID INTEGER,
    name TEXT,
    image TEXT
);
CREATE TABLE IF NOT EXISTS ProductField (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fieldID NUMBER,
    value TEXT
);
CREATE TABLE IF NOT EXISTS Field (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    categoryID NUMBER,
    type TEXT,
    value TEXT,
    name TEXT
);
CREATE TABLE IF NOT EXISTS Reference (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT,
    salePrice NUMBER,
    buyPrice NUMBER,
    vendorName TEXT,
    currency TEXT,
    favorite NUMBER,
    quantity NUMBER DEFAULT 0,
    productID INTEGER
);
CREATE TABLE IF NOT EXISTS SaleTransaction (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clienID NUMBER,
    price NUMBER,
    ReferenceID NUMBER
);
CREATE TABLE IF NOT EXISTS Client (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT,
    email TEXT,
    phone TEXT,
    comment TEXT
);
CREATE TABLE IF NOT EXISTS Category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    companyID NUMBER,
    name TEXT,
    parentID NUMBER
);
CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    name TEXT,
    activated INTEGER,
    email TEXT UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS Employee (
    userID INTEGER,
    access TEXT,
    companyID INTEGER
);