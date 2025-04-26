import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ label: "", urgent: false });

  const addTask = () => {
    if (newTask.label.trim()) {
      setTasks([{ ...newTask }, ...tasks]);
      setNewTask({ label: "", urgent: false });
    }
  };

  const toggleUrgency = (i) => {
    const updated = [...tasks];
    updated[i].urgent = !updated[i].urgent;
    setTasks(updated);
  };

  const markAsResolved = (i) => {
    const updated = tasks.filter((_, idx) => idx !== i);
    setTasks(updated);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>✅ Gestion des Tâches HSE</CardTitle>
        <Button onClick={addTask}>+ Ajouter Tâche</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Création tâche */}
        <Input
          placeholder="Nouvelle tâche..."
          value={newTask.label}
          onChange={(e) => setNewTask({ ...newTask, label: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <div className="flex gap-4 items-center">
          <input
            type="checkbox"
            checked={newTask.urgent}
            onChange={(e) => setNewTask({ ...newTask, urgent: e.target.checked })}
          />
          <span>Urgente</span>
        </div>

        {/* Liste tâches */}
        <ul className="space-y-2 mt-4">
          {tasks.map((task, i) => (
            <li key={i}
              className={`flex justify-between items-center p-2 border rounded cursor-pointer ${
                task.urgent ? "bg-red-100" : "bg-green-100"
              }`}
            >
              <div onClick={() => toggleUrgency(i)}>
                {task.label}
                {task.urgent && <span className="ml-2 text-red-600 font-bold">(Urgent)</span>}
              </div>
              <Button size="sm" variant="destructive" onClick={() => markAsResolved(i)}>Résolu</Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
