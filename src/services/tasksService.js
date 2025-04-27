import { supabase } from "../lib/supabaseClient";

// Lire toutes les tâches
export const getTasks = async () => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Erreur récupération tâches :', error);
    return [];
  }
  return data;
};

// Ajouter une tâche
export const addTask = async (label, urgent = false) => {
  const { error } = await supabase
    .from('tasks')
    .insert([{ label, urgent }]);

  if (error) console.error('Erreur ajout tâche :', error);
};

// Marquer tâche résolue
export const resolveTask = async (id) => {
  const { error } = await supabase
    .from('tasks')
    .update({ resolved: true })
    .eq('id', id);

  if (error) console.error('Erreur résolution tâche :', error);
};
