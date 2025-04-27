import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

import { getKPIs, addKPI, editKPI, deleteKPI } from "../../services/kpisService";

export default function KPIPage() {
  const [kpis, setKpis] = useState([]);
  const [newKpi, setNewKpi] = useState({ name: "", value: "", unit: "", recorded_date: "" });

  useEffect(() => {
    fetchKPIs();
  }, []);

  const fetchKPIs = async () => {
    const loaded = await getKPIs();
    setKpis(loaded);
  };

  const handleAddKPI = async () => {
    if (newKpi.name.trim() && newKpi.value && newKpi.recorded_date) {
      await addKPI(newKpi.name, parseFloat(newKpi.value), newKpi.unit, newKpi.recorded_date);
      setNewKpi({ name: "", value: "", unit: "", recorded_date: "" });
      fetchKPIs();
    }
  };

  const handleDeleteKPI = async (id) => {
    await deleteKPI(id);
    fetchKPIs();
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>📊 Suivi des Indicateurs HSE</CardTitle>
        <Button onClick={handleAddKPI}>+ Ajouter KPI</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Nom indicateur (ex: TF, TG)"
          value={newKpi.name}
          onChange={(e) => setNewKpi({ ...newKpi, name: e.target.value })}
        />
        <Input
          placeholder="Valeur"
          type="number"
          value={newKpi.value}
          onChange={(e) => setNewKpi({ ...newKpi, value: e.target.value })}
        />
        <Input
          placeholder="Unité (optionnel)"
          value={newKpi.unit}
          onChange={(e) => setNewKpi({ ...newKpi, unit: e.target.value })}
        />
        <Input
          placeholder="Date enregistrement (ex: 2025-04-30)"
          type="date"
          value={newKpi.recorded_date}
          onChange={(e) => setNewKpi({ ...newKpi, recorded_date: e.target.value })}
        />

        {/* Graphique KPIs */}
        <div className="mt-8">
          <LineChart width={600} height={300} data={kpis}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="recorded_date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" name="Valeur KPI" />
          </LineChart>
        </div>

        {/* Liste des KPIs */}
        <ul className="space-y-2 mt-6">
          {kpis.map((kpi) => (
            <li key={kpi.id}
                className="p-2 border rounded flex justify-between items-center">
              <div>
                <strong>{kpi.name}</strong> : {kpi.value} {kpi.unit} ({new Date(kpi.recorded_date).toLocaleDateString()})
              </div>
              <Button size="sm" variant="destructive" onClick={() => handleDeleteKPI(kpi.id)}>
                Supprimer
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
