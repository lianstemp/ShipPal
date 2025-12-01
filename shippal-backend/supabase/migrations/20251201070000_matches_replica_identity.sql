-- Set REPLICA IDENTITY FULL for matches table to receive full old record in realtime
ALTER TABLE public.matches REPLICA IDENTITY FULL;
