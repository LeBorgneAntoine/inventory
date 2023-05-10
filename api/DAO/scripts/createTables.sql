CREATE TABLE IF NOT EXISTS Reference (

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref TEXT NOT NULL,
    name TEXT NOT NULL,
    comment TEXT,
    image TEXT,
    quantity NUMBER DEFAULT 0,
    folder TEXT

);
CREATE TABLE IF NOT EXISTS Folder (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    parent TEXT
);