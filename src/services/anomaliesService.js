import { supabase } from "../lib/supabaseClient";

// Lire toutes les anomalies
export const getAnomalies = async () => {
  const { data, error } = await supabase
    .from('anomalies')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur récupération anomalies :', error);
    return [];
  }
  return data;
};

// Ajouter une anomalie
export const addAnomaly = async (description, critical = false, photo_base64 = null) => {
  const { error } = await supabase
    .from('anomalies')
    .insert([{ description, critical, photo_base64 }]);

  if (error) console.error('Erreur ajout anomalie :', error);
};

// Marquer anomalie corrigée
export const resolveAnomaly = async (id) => {
  const { error } = await supabase
    .from('anomalies')
    .update({ resolved: true })
    .eq('id', id);

  if (error) console.error('Erreur résolution anomalie :', error);
};