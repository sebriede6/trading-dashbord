-- Migration: pip_mode (pips/punkte) für Trades
ALTER TABLE trades ADD COLUMN IF NOT EXISTS pip_mode VARCHAR(16);