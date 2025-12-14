import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://1x3utiqbcbfnpicjaydd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IjF4M3V0aXFiY2JmbnBpY2pheWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MjQxMzUsImV4cCI6MjA1MDUwMDEzNX0.PLq1TBpo-r3Ql1xd1jz5ieXet-z31_JPQLTBxp";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing!');
  console.log('VITE_SUPABASE_URL:', supabaseUrl);
  console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Found' : 'Missing');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
