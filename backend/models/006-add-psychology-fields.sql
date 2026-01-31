-- Migration: Add psychology and error tracking fields to trades
ALTER TABLE trades ADD COLUMN IF NOT EXISTS mood VARCHAR(32);
ALTER TABLE trades ADD COLUMN IF NOT EXISTS fehler_tags TEXT;
ALTER TABLE trades ADD COLUMN IF NOT EXISTS reflexion TEXT;