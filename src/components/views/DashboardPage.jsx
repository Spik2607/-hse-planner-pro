import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import CalendarAgenda from "./AgendaPage";
import { getTasks } from "../../services/tasksService";
import { getAnomalies } from "../../services/anomaliesService";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const loadedTasks = await getTasks();
      const loadedAnomalies = await getAnomalies();
      setTasks(loadedTasks);
      setAnomalies(loadedAnomalies);
    };
    fetchData();
  }, []);

  const urgentTasks = tasks.filter(t => t.urgent && !t.resolved);
  const criticalAnomalies = anomalies.filter(a => a.critical && !a.resolved);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <div className="space-y-6">
        <CalendarAgenda />

        <Card>
          <CardHeader><CardTitle>✅ Tâches urgentes</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {urgentTasks.length === 0 ? (
              <p className="text-sm text-gray-500 text-center">Aucune tâche urgente.</p>
            ) : urgentTasks.map((t) => (
              <div key={t.id} className="p-2 bg-red-100 rounded">{t.label}</div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>🚨 Anomalies critiques</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {criticalAnomalies.length === 0 ? (
              <p className="text-sm text-gray-500 text-center">Aucune anomalie critique.</p>
            ) : criticalAnomalies.map((a) => (
              <div key={a.id} className="p-2 bg-red-200 rounded">{a.description}</div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>📊 Indicateurs fixes</CardTitle></CardHeader>
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
