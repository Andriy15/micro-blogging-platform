import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://orptfcdavoxuvchnlyiq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ycHRmY2Rhdm94dXZjaG5seWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM0MTcxMzYsImV4cCI6MjAwODk5MzEzNn0.rdHXRzeIsV0z3itusCbtVUfHD0a1iENlpTpMBmFqfRs'

export const supabase = createClient( supabaseUrl, supabaseAnonKey )
