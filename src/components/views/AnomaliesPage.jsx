import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function AnomaliesPage() {
  const [anomalies, setAnomalies] = useState([]);
  const [newAnomaly, setNewAnomaly] = useState({ description: "", critical: false });

  const addAnomaly = () => {
    if (newAnomaly.description.trim()) {
      setAnomalies([{ ...newAnomaly }, ...anomalies]);
      setNewAnomaly({ description: "", critical: false });
    }
  };

  const toggleCriticality = (i) => {
    const updated = [...anomalies];
    updated[i].critical = !updated[i].critical;
    setAnomalies(updated);
  };

  const markAsResolved = (i) => {
    const updated = anomalies.filter((_, idx) => idx !== i);
    setAnomalies(updated);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>🚨 Registre Anomalies Environnementales</CardTitle>
        <Button onClick={addAnomaly}>+ Déclarer Anomalie</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Création anomalie */}
        <Input
          placeholder="Décrire anomalie..."
          value={newAnomaly.description}
          onChange={(e) => setNewAnomaly({ ...newAnomaly, description: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && addAnomaly()}
        />
        <div className="flex gap-4 items-center">
          <input
            type="checkbox"
            checked={newAnomaly.critical}
            onChange={(e) => setNewAnomaly({ ...newAnomaly, critical: e.target.checked })}
          />
          <span>Critique</span>
        </div>

        {/* Liste anomalies */}
        <ul className="space-y-2 mt-4">
          {anomalies.map((anom, i) => (
            <li key={i}
              className={`flex justify-between items-center p-2 border rounded cursor-pointer ${
                anom.critical ? "bg-red-200" : "bg-yellow-100"
              }`}
            >
              <div onClick={() => toggleCriticality(i)}>
                {anom.description}
                {anom.critical && <span className="ml-2 text-red-600 font-bold">(Critique)</span>}
              </div>
              <Button size="sm" variant="destructive" onClick={() => markAsResolved(i)}>Corrigée</Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
