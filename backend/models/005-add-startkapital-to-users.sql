-- Migration: Add startkapital column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS startkapital NUMERIC(16,2);