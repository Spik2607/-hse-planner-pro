import { supabase } from "../lib/supabaseClient";

// 🔥 Lire tous les événements
export const getEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true });

  if (error) {
    console.error('Erreur récupération événements :', error);
    return [];
  }
  return data;
};

// 🔥 Ajouter un événement
export const addEvent = async (title, description, zone, priority, event_date) => {
  const { error } = await supabase
    .from('events')
    .insert([{ title, description, zone, priority, event_date }]);

  if (error) console.error('Erreur ajout événement :', error);
};

// 🔥 Modifier un événement
export const editEvent = async (id, updatedData) => {
  const { error } = await supabase
    .from('events')
    .update(updatedData)
    .eq('id', id);

  if (error) console.error('Erreur édition événement :', error);
};

// 🔥 Supprimer un événement
export const deleteEvent = async (id) => {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) console.error('Erreur suppression événement :', error);
};
