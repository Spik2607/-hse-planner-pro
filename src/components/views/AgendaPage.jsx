import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { getEvents, addEvent, deleteEvent } from "../../services/eventsService";
import { addTask } from "../../services/tasksService";

export default function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    zone: "",
    priority: "Normale"
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const loadedEvents = await getEvents();
    setEvents(loadedEvents);
  };

  const handleAddEvent = async () => {
    if (newEvent.title.trim()) {
      await addEvent(
        newEvent.title,
        newEvent.description,
        newEvent.zone,
        newEvent.priority,
        selectedDate
      );
      setNewEvent({ title: "", description: "", zone: "", priority: "Normale" });
      setModalOpen(false);
      fetchEvents();
    }
  };

  const handleDeleteEvent = async (id) => {
    await deleteEvent(id);
    fetchEvents();
  };

  const handleCreateTaskFromEvent = async (event) => {
    await addTask(event.title, false);
    alert(`✅ Tâche HSE créée : ${event.title}`);
  };

  const eventsOfDay = events.filter((event) => {
    const d = new Date(event.event_date);
    return (
      d.getFullYear() === selectedDate.getFullYear() &&
      d.getMonth() === selectedDate.getMonth() &&
      d.getDate() === selectedDate.getDate()
    );
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>📅 Agenda HSE Interactif</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <Calendar
          onChange={(date) => {
            setSelectedDate(date);
            setModalOpen(true);
          }}
          value={selectedDate}
          className="rounded-lg shadow p-2"
        />

        {modalOpen && (
          <div className="w-full mt-4 p-4 bg-gray-100 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">
              📌 Événements du {selectedDate.toLocaleDateString()}
            </h3>

            <Input
              placeholder="Titre"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="mb-2"
            />
            <Input
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className="mb-2"
            />
            <Input
              placeholder="Zone"
              value={newEvent.zone}
              onChange={(e) => setNewEvent({ ...newEvent, zone: e.target.value })}
              className="mb-2"
            />
            <select
              className="border rounded px-4 py-2 w-full mb-2"
              value={newEvent.priority}
              onChange={(e) => setNewEvent({ ...newEvent, priority: e.target.value })}
            >
              <option value="Normale">Normale</option>
              <option value="Haute">Haute</option>
              <option value="Critique">Critique</option>
            </select>

            <Button onClick={handleAddEvent} className="w-full mb-4">➕ Ajouter l'événement</Button>

            {eventsOfDay.length > 0 && (
              <div className="space-y-2">
                {eventsOfDay.map((event) => (
                  <div key={event.id} className="p-2 bg-blue-100 rounded flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold">{event.title}</div>
                        <div className="text-sm">{event.description}</div>
                        <div className="text-xs text-gray-600">{event.zone} • {event.priority}</div>
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCreateTaskFromEvent(event)}
                    >
                      ➕ Créer Tâche HSE
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <Button
              onClick={() => setModalOpen(false)}
              variant="outline"
              className="w-full mt-4"
            >
              Fermer
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
