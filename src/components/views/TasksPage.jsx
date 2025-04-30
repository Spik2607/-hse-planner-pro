import React, { useEffect, useState } from "react";
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
    const loaded = await getTasks();
    setTasks(loaded);
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
        <CardTitle>✅ Tâches HSE</CardTitle>
        <Button onClick={handleAddTask}>+ Ajouter</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Nom de la tâche"
          value={newTask.label}
          onChange={(e) => setNewTask({ ...newTask, label: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={newTask.urgent}
            onChange={(e) => setNewTask({ ...newTask, urgent: e.target.checked })}
          />
          Tâche urgente
        </label>

        <ul className="space-y-2 mt-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-2 rounded border ${
                task.urgent ? "bg-red-100" : "bg-green-100"
              }`}
            >
              <span>{task.label}</span>
              {!task.resolved && (
                <Button size="sm" variant="destructive" onClick={() => handleResolveTask(task.id)}>
                  Résolu
                </Button>
              )}
              {task.resolved && (
                <span className="text-xs text-gray-500">✅ Résolu</span>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
