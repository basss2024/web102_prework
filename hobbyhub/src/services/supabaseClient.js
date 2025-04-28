import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vezxjjnaujbtzqsyeapu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlenhqam5hdWpidHpxc3llYXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3OTA3NDcsImV4cCI6MjA2MTM2Njc0N30.N64fWr9qlXzBvsr_2IRJK3ljTpLdrd3eHtI7eksMbYQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
