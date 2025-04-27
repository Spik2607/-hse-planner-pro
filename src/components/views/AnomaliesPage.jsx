import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { getAnomalies, addAnomaly, resolveAnomaly } from "../../services/anomaliesService";

export default function AnomaliesPage() {
  const [anomalies, setAnomalies] = useState([]);
  const [newAnomaly, setNewAnomaly] = useState({ description: "", critical: false, photo: null });

  useEffect(() => {
    fetchAnomalies();
  }, []);

  const fetchAnomalies = async () => {
    const loadedAnomalies = await getAnomalies();
    setAnomalies(loadedAnomalies);
  };

  const handleAddAnomaly = async () => {
    if (newAnomaly.description.trim()) {
      let photoBase64 = null;
      if (newAnomaly.photo) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          photoBase64 = reader.result;
          await addAnomaly(newAnomaly.description, newAnomaly.critical, photoBase64);
          setNewAnomaly({ description: "", critical: false, photo: null });
          fetchAnomalies();
        };
        reader.readAsDataURL(newAnomaly.photo);
      } else {
        await addAnomaly(newAnomaly.description, newAnomaly.critical, null);
        setNewAnomaly({ description: "", critical: false, photo: null });
        fetchAnomalies();
      }
    }
  };

  const handleResolveAnomaly = async (id) => {
    await resolveAnomaly(id);
    fetchAnomalies();
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>🚨 Registre Anomalies connectées Cloud</CardTitle>
        <Button onClick={handleAddAnomaly}>+ Déclarer Anomalie</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Décrire anomalie..."
          value={newAnomaly.description}
          onChange={(e) => setNewAnomaly({ ...newAnomaly, description: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && handleAddAnomaly()}
        />
        <div className="flex gap-4 items-center">
          <input
            type="checkbox"
            checked={newAnomaly.critical}
            onChange={(e) => setNewAnomaly({ ...newAnomaly, critical: e.target.checked })}
          />
          <span>Critique</span>
        </div>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setNewAnomaly({ ...newAnomaly, photo: e.target.files[0] })}
        />

        {/* Liste des anomalies */}
        <ul className="space-y-2 mt-4">
          {anomalies.map((anom) => (
            <li key={anom.id}
                className={`flex flex-col gap-2 p-2 border rounded cursor-pointer ${
                  anom.critical ? "bg-red-200" : "bg-yellow-100"
                }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  {anom.description}
                  {anom.critical && <span className="ml-2 text-red-600 font-bold">(Critique)</span>}
                </div>
                {!anom.resolved && (
                  <Button size="sm" variant="destructive" onClick={() => handleResolveAnomaly(anom.id)}>
                    Corrigée
                  </Button>
                )}
              </div>
              {anom.photo_base64 && (
                <img
                  src={anom.photo_base64}
                  alt="Preuve"
                  className="w-32 h-32 object-cover rounded shadow"
                />
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
