import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { getKPIs, addKPI, deleteKPI } from "../../services/kpisService";

export default function KPIPage() {
  const [kpis, setKpis] = useState([]);
  const [newKpi, setNewKpi] = useState({
    name: "",
    value: "",
    unit: "",
    recorded_date: "",
  });

  useEffect(() => {
    fetchKpis();
  }, []);

  const fetchKpis = async () => {
    const data = await getKPIs();
    setKpis(data);
  };

  const handleAdd = async () => {
    if (!newKpi.name || !newKpi.value || !newKpi.recorded_date) return;
    await addKPI(
      newKpi.name,
      parseFloat(newKpi.value),
      newKpi.unit,
      newKpi.recorded_date
    );
    setNewKpi({ name: "", value: "", unit: "", recorded_date: "" });
    fetchKpis();
  };

  const handleDelete = async (id) => {
    await deleteKPI(id);
    fetchKpis();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>📊 Suivi des indicateurs (TF, TG...)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Nom (ex: TF)"
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
            type="date"
            value={newKpi.recorded_date}
            onChange={(e) =>
              setNewKpi({ ...newKpi, recorded_date: e.target.value })
            }
          />
        </div>
        <Button className="w-full" onClick={handleAdd}>
          ➕ Ajouter indicateur
        </Button>

        {kpis.length > 0 && (
          <LineChart width={600} height={300} data={kpis}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="recorded_date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" name="Valeur" />
          </LineChart>
        )}

        <ul className="pt-4 space-y-2">
          {kpis.map((kpi) => (
            <li
              key={kpi.id}
              className="flex justify-between items-center p-2 border rounded"
            >
              <span>
                <strong>{kpi.name}</strong> : {kpi.value} {kpi.unit} —{" "}
                {new Date(kpi.recorded_date).toLocaleDateString()}
              </span>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(kpi.id)}>
                Supprimer
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
