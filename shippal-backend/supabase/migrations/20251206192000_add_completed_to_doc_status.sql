-- Migration: Add 'completed' to doc_status enum
-- Created at: 2025-12-06
-- Reason: Frontend uses 'completed' status to indicate a document has been uploaded by the user.

-- Note: ALTER TYPE ... ADD VALUE cannot be executed inside a transaction block.
-- Supabase migrations might wrap in transaction? Actually, usually it's fine if it's the only statement or handled correctly.
-- If this fails due to transaction block, we might need to run it differently or use a workaround.
-- However, for now, this is the standard way.

ALTER TYPE public.doc_status ADD VALUE IF NOT EXISTS 'completed';
