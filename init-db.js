// Run this with wrangler d1 execute gallery-db --file=init-db.sql

// But since we can't run it here, here's the SQL:

const initSQL = `
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  suspended BOOLEAN DEFAULT FALSE,
  storageLimit INTEGER DEFAULT 1024, -- MB
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  size INTEGER NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);

-- Insert admin user
INSERT INTO users (username, email, password, role) VALUES ('admin', 'admin@example.com', 'adminpass', 'admin');
`

console.log(initSQL)