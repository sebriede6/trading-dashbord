
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255),
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  text TEXT NOT NULL
);

-- Stelle sicher, dass startkapital und email immer existieren
ALTER TABLE users ADD COLUMN IF NOT EXISTS startkapital NUMERIC(16,2);
ALTER TABLE users ADD COLUMN IF NOT EXISTS email VARCHAR(255);
