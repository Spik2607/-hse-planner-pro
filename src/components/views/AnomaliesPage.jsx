import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { getAnomalies, addAnomaly, resolveAnomaly } from "../../services/anomaliesService";

export default function AnomaliesPage() {
  const [anomalies, setAnomalies] = useState([]);
  const [newAnomaly, setNewAnomaly] = useState({
    description: "",
    critical: false,
    photo: null,
  });

  useEffect(() => {
    fetchAnomalies();
  }, []);

  const fetchAnomalies = async () => {
    const loaded = await getAnomalies();
    setAnomalies(loaded);
  };

  const handleAddAnomaly = async () => {
    if (!newAnomaly.description.trim()) return;

    if (newAnomaly.photo) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        await addAnomaly(newAnomaly.description, newAnomaly.critical, reader.result);
        setNewAnomaly({ description: "", critical: false, photo: null });
        fetchAnomalies();
      };
      reader.readAsDataURL(newAnomaly.photo);
    } else {
      await addAnomaly(newAnomaly.description, newAnomaly.critical, null);
      setNewAnomaly({ description: "", critical: false, photo: null });
      fetchAnomalies();
    }
  };

  const handleResolve = async (id) => {
    await resolveAnomaly(id);
    fetchAnomalies();
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>🚨 Anomalies Environnement</CardTitle>
        <Button onClick={handleAddAnomaly}>+ Ajouter</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Description"
          value={newAnomaly.description}
          onChange={(e) =>
            setNewAnomaly({ ...newAnomaly, description: e.target.value })
          }
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={newAnomaly.critical}
            onChange={(e) =>
              setNewAnomaly({ ...newAnomaly, critical: e.target.checked })
            }
          />
          <span>Critique</span>
        </div>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setNewAnomaly({ ...newAnomaly, photo: e.target.files[0] })
          }
        />

        <ul className="space-y-2 pt-4">
          {anomalies.map((anom) => (
            <li
              key={anom.id}
              className={`p-2 border rounded ${
                anom.critical ? "bg-red-100" : "bg-yellow-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <strong>{anom.description}</strong>
                  {anom.critical && <span className="ml-2 text-red-600">(Critique)</span>}
                </div>
                {!anom.resolved && (
                  <Button size="sm" variant="destructive" onClick={() => handleResolve(anom.id)}>
                    Corrigée
                  </Button>
                )}
              </div>
              {anom.photo_base64 && (
                <img
                  src={anom.photo_base64}
                  alt="Preuve"
                  className="mt-2 w-32 h-32 object-cover rounded"
                />
              )}
              {anom.resolved && (
                <div className="text-xs text-gray-500 mt-1">✅ Corrigée</div>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
