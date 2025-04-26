import React, { useState } from "react";
import { Sidebar } from "./components/ui/Sidebar";

import DashboardPage from "./components/views/DashboardPage";
import AgendaPage from "./components/views/AgendaPage";
import TasksPage from "./components/views/TasksPage";
import AnomaliesPage from "./components/views/AnomaliesPage";
import KPIPage from "./components/views/KPIPage";
import EnvironnementPage from "./components/views/EnvironnementPage";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderPage = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardPage />;
      case "agenda": return <AgendaPage />;
      case "tasks": return <TasksPage />;
      case "anomalies": return <AnomaliesPage />;
      case "kpi": return <KPIPage />;
      case "environnement": return <EnvironnementPage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto p-6 bg-gray-100">
        {renderPage()}
      </main>
    </div>
  );
}
