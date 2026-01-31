-- Erstellt eine Tabelle für Trades
CREATE TABLE IF NOT EXISTS trades (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    symbol VARCHAR(16) NOT NULL,
    type VARCHAR(8) NOT NULL CHECK (type IN ('buy', 'sell')),
    price NUMERIC(16,4),
    lots NUMERIC(16,4),
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
