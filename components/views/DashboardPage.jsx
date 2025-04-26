import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";

import { getTasks } from "../../services/tasksService";
import { getAnomalies } from "../../services/anomaliesService";
import CalendarAgenda from "./AgendaPage";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const loadedTasks = await getTasks();
    const loadedAnomalies = await getAnomalies();
    setTasks(loadedTasks);
    setAnomalies(loadedAnomalies);
  };

  const urgentTasks = tasks.filter(task => task.urgent && !task.resolved);
  const criticalAnomalies = anomalies.filter(anom => anom.critical && !anom.resolved);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Colonne gauche */}
      <div className="space-y-6">

        {/* Agenda résumé */}
        <CalendarAgenda />

        {/* Tâches urgentes */}
        <Card>
          <CardHeader><CardTitle>✅ Tâches Urgentes</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {urgentTasks.length === 0 ? (
              <p className="text-gray-500 text-center">Aucune tâche urgente à traiter.</p>
            ) : (
              urgentTasks.map((task, idx) => (
                <div key={idx} className="p-2 bg-red-100 rounded">{task.label}</div>
              ))
            )}
          </CardContent>
        </Card>

      </div>

      {/* Colonne droite */}
      <div className="space-y-6">

        {/* Anomalies critiques */}
        <Card>
          <CardHeader><CardTitle>🚨 Anomalies Critiques</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {criticalAnomalies.length === 0 ? (
              <p className="text-gray-500 text-center">Aucune anomalie critique en cours.</p>
            ) : (
              criticalAnomalies.map((anom, idx) => (
                <div key={idx} className="p-2 bg-red-200 rounded">{anom.description}</div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Indicateurs fixes */}
        <Card>
          <CardHeader><CardTitle>📊 Indicateurs Rapides</CardTitle></CardHeader>
          <CardContent className="flex justify-around">
            <div className="text-center">
              <div className="text-3xl font-bold">12,4</div>
              <div className="text-gray-500">TF</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">2,8</div>
              <div className="text-gray-500">TG</div>
            </div>
          </CardContent>
        </Card>

      </div>

    </div>
  );
}
