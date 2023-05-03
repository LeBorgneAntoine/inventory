CREATE TABLE IF NOT EXISTS Refrence (

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref TEXT NOT NULL,
    name TEXT NOT NULL,
    comments TEXT,
    picture_name TEXT,
    quantity NUMBER DEFAULT 0,
    folder NUMBER

);
CREATE TABLE IF NOT EXISTS Folder (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    parent NUMBER
);