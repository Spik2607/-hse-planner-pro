import { supabase } from "../lib/supabaseClient";

// 🔥 Lire tous les KPIs
export const getKPIs = async () => {
  const { data, error } = await supabase
    .from('kpis')
    .select('*')
    .order('recorded_date', { ascending: true });

  if (error) {
    console.error('Erreur récupération KPI :', error);
    return [];
  }
  return data;
};

// 🔥 Ajouter un KPI
export const addKPI = async (name, value, unit, recorded_date) => {
  const { error } = await supabase
    .from('kpis')
    .insert([{ name, value, unit, recorded_date }]);

  if (error) console.error('Erreur ajout KPI :', error);
};

// 🔥 Modifier un KPI
export const editKPI = async (id, updatedData) => {
  const { error } = await supabase
    .from('kpis')
    .update(updatedData)
    .eq('id', id);

  if (error) console.error('Erreur édition KPI :', error);
};

// 🔥 Supprimer un KPI
export const deleteKPI = async (id) => {
  const { error } = await supabase
    .from('kpis')
    .delete()
    .eq('id', id);

  if (error) console.error('Erreur suppression KPI :', error);
};
