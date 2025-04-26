import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import CalendarAgenda from "./AgendaPage"; // Utilisation du mini Agenda

export default function DashboardPage() {
  // Simulation du "store" interne
  const [tasks, setTasks] = useState([
    { label: "Inspection sécurité zone Est", urgent: true },
    { label: "Réunion équipe HSE", urgent: false },
  ]);

  const [anomalies, setAnomalies] = useState([
    { description: "Fuite de poussières secteur broyage", critical: true },
    { description: "Zone déchets non balisée", critical: false },
  ]);

  // Filtrer tâches urgentes
  const urgentTasks = tasks.filter(task => task.urgent);

  // Filtrer anomalies critiques
  const criticalAnomalies = anomalies.filter(anom => anom.critical);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Colonne gauche */}
      <div className="space-y-6">

        {/* Agenda résumé */}
        <CalendarAgenda />

        {/* Tâches urgentes */}
        <Card>
          <CardHeader><CardTitle>✅ Tâches HSE Urgentes</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {urgentTasks.length === 0 ? (
              <p className="text-gray-500">Aucune tâche urgente en attente.</p>
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

        {/* Indicateurs rapides */}
        <Card>
          <CardHeader><CardTitle>📊 Indicateurs rapides</CardTitle></CardHeader>
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

        {/* Anomalies critiques */}
        <Card>
          <CardHeader><CardTitle>🚨 Anomalies Critiques</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {criticalAnomalies.length === 0 ? (
              <p className="text-gray-500">Aucune anomalie critique active.</p>
            ) : (
              criticalAnomalies.map((anom, idx) => (
                <div key={idx} className="p-2 bg-red-200 rounded">{anom.description}</div>
              ))
            )}
          </CardContent>
        </Card>

      </div>

    </div>
  );
}
