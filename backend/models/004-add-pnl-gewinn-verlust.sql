-- Migration: Add pnl, gewinn, verlust columns to trades table for manual journaling
ALTER TABLE trades ADD COLUMN IF NOT EXISTS pnl NUMERIC(16,2);
ALTER TABLE trades ADD COLUMN IF NOT EXISTS gewinn NUMERIC(16,2);
ALTER TABLE trades ADD COLUMN IF NOT EXISTS verlust NUMERIC(16,2);