import { supabase } from "../lib/supabaseClient";

// 🔥 Lire toutes les checklists
export const getChecklists = async () => {
  const { data, error } = await supabase
    .from('checklists')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur récupération checklists :', error);
    return [];
  }
  return data;
};

// 🔥 Ajouter une nouvelle checklist
export const addChecklist = async (title, items = []) => {
  const { error } = await supabase
    .from('checklists')
    .insert([{ title, items }]);

  if (error) console.error('Erreur ajout checklist :', error);
};

// 🔥 Valider une checklist
export const validateChecklist = async (id) => {
  const { error } = await supabase
    .from('checklists')
    .update({ validated: true })
    .eq('id', id);

  if (error) console.error('Erreur validation checklist :', error);
};
