import React from "react";
import { Home, Calendar, ClipboardList, AlertTriangle, BarChart2, Leaf } from "lucide-react";

export function Sidebar({ activeTab, setActiveTab }) {
  const menu = [
    { label: "Dashboard", icon: <Home />, value: "dashboard" },
    { label: "Agenda", icon: <Calendar />, value: "agenda" },
    { label: "Tâches", icon: <ClipboardList />, value: "tasks" },
    { label: "Anomalies", icon: <AlertTriangle />, value: "anomalies" },
    { label: "Indicateurs", icon: <BarChart2 />, value: "kpi" },
    { label: "Environnement", icon: <Leaf />, value: "environnement" },
  ];

  return (
    <aside className="w-60 bg-blue-700 text-white flex flex-col p-4 space-y-4">
      {menu.map((item, idx) => (
        <button
          key={idx}
          onClick={() => setActiveTab(item.value)}
          className={`flex items-center gap-3 p-3 rounded hover:bg-blue-600 transition ${
            activeTab === item.value ? "bg-blue-600" : ""
          }`}
        >
          {item.icon}
          <span className="text-md font-semibold">{item.label}</span>
        </button>
      ))}
    </aside>
  );
}
