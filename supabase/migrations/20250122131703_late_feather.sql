/*
  # Add budget column to categories table

  1. Changes
    - Add budget column to categories table for storing monthly budget amounts
    - Make budget column nullable since not all categories need a budget
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'categories' AND column_name = 'budget'
  ) THEN
    ALTER TABLE categories ADD COLUMN budget decimal(12,2);
  END IF;
END $$;