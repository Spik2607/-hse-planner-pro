import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { getTasks, addTask, resolveTask } from "../../services/tasksService";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ label: "", urgent: false });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const loadedTasks = await getTasks();
    setTasks(loadedTasks);
  };

  const handleAddTask = async () => {
    if (newTask.label.trim()) {
      await addTask(newTask.label, newTask.urgent);
      setNewTask({ label: "", urgent: false });
      fetchTasks();
    }
  };

  const handleResolveTask = async (id) => {
    await resolveTask(id);
    fetchTasks();
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>✅ Tâches HSE connectées Cloud</CardTitle>
        <Button onClick={handleAddTask}>+ Ajouter Tâche</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Nouvelle tâche..."
          value={newTask.label}
          onChange={(e) => setNewTask({ ...newTask, label: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <div className="flex gap-4 items-center">
          <input
            type="checkbox"
            checked={newTask.urgent}
            onChange={(e) => setNewTask({ ...newTask, urgent: e.target.checked })}
          />
          <span>Urgente</span>
        </div>
        <ul className="space-y-2 mt-4">
          {tasks.map((task) => (
            <li key={task.id}
                className={`flex justify-between items-center p-2 border rounded cursor-pointer ${
                  task.urgent ? "bg-red-100" : "bg-green-100"
                }`}
            >
              <div>
                {task.label}
                {task.urgent && <span className="ml-2 text-red-600 font-bold">(Urgent)</span>}
              </div>
              {!task.resolved && (
                <Button size="sm" variant="destructive" onClick={() => handleResolveTask(task.id)}>
                  Résolu
                </Button>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
