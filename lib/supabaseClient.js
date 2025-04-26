import { createClient } from '@supabase/supabase-js'

// Récupérer les variables d'environnement de ton projet Supabase
const supabaseUrl = "https://ctpznjxyjeoolrruyslf.supabase.co";  // Remplacer par ton URL réel
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0cHpuanh5amVvb2xycnV5c2xmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2ODY4NjYsImV4cCI6MjA2MTI2Mjg2Nn0.utY8Ixe4iFR50vxKxMeyG9IRMXIJa6MRPd2e5cFNoGo";           // Remplacer par ta clé Anonyme (Public)

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
