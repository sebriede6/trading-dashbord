-- Migration: Erweitere spread auf NUMERIC(16,5)
ALTER TABLE trades ALTER COLUMN spread TYPE NUMERIC(16,5);
