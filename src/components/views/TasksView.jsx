import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function TasksView() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([{ label: newTask, done: false }, ...tasks]);
      setNewTask("");
    }
  };

  const toggleTask = (i) => {
    const updated = [...tasks];
    updated[i].done = !updated[i].done;
    setTasks(updated);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Tâches HSE</CardTitle>
        <Button variant="solid" size="sm" onClick={addTask}>+ Ajouter</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Nouvelle tâche..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <ul className="space-y-2 mt-4">
          {tasks.map((task, i) => (
            <li key={i} onClick={() => toggleTask(i)}
                className={`p-2 border rounded cursor-pointer ${task.done ? "line-through opacity-50" : ""}`}>
              {task.label}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
