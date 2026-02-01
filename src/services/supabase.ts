import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || 'https://yruekqophpknanocfulr.supabase.co';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlydWVrcW9waHBrbmFub2NmdWxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5MzU4NzAsImV4cCI6MjA4NTUxMTg3MH0.eynmIvnmr_5zCduOX2-MaP17CnCTQb2yUY6YTe3w8Ls';

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
