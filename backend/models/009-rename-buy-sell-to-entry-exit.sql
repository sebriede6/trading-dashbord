-- Migration: Ersetze buy_price/sell_price durch entry_price/exit_price
ALTER TABLE trades RENAME COLUMN buy_price TO entry_price;
ALTER TABLE trades RENAME COLUMN sell_price TO exit_price;
-- Falls die Spalten noch nicht existieren (bei alten DBs):
ALTER TABLE trades ADD COLUMN IF NOT EXISTS entry_price NUMERIC(16,5);
ALTER TABLE trades ADD COLUMN IF NOT EXISTS exit_price NUMERIC(16,5);
-- Optional: Alte Spalten entfernen, falls noch vorhanden
-- ALTER TABLE trades DROP COLUMN IF EXISTS buy_price;
-- ALTER TABLE trades DROP COLUMN IF EXISTS sell_price;
