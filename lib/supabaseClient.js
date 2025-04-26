import { createClient } from '@supabase/supabase-js'

// Récupérer les variables d'environnement de ton projet Supabase

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
