import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = "https://pnwhreoffpiucjtxepzo.supabase.co"; // replace with your URL
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBud2hyZW9mZnBpdWNqdHhlcHpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYzOTc0MzAsImV4cCI6MjA4MTk3MzQzMH0.t06_z2xHxthHrT8VpOoGc9KU-no9tStp5P7uwmBOZB0"; // replace with your anon key
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
