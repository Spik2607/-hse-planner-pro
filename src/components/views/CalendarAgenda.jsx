import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function CalendarAgenda() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", type: "inspection" });

  const handleAddEvent = () => {
    if (newEvent.title) {
      setEvents([...events, {
        date: selectedDate.toDateString(),
        title: newEvent.title,
        type: newEvent.type
      }]);
      setNewEvent({ title: "", type: "inspection" });
    }
  };

  const getColor = (type) => {
    switch (type) {
      case "inspection": return "bg-green-300 text-green-900";
      case "reunion": return "bg-yellow-300 text-yellow-900";
      case "incident": return "bg-red-300 text-red-900";
      default: return "bg-gray-300 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>📅 Agenda interactif</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          {/* Calendrier */}
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="rounded-lg shadow border p-2"
          />

          {/* Formulaire Ajouter un événement */}
          <div className="w-full space-y-2">
            <Input
              placeholder="Titre événement"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <select
              className="border rounded px-3 py-2 w-full"
              value={newEvent.type}
              onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
            >
              <option value="inspection">Inspection</option>
              <option value="reunion">Réunion</option>
              <option value="incident">Incident</option>
            </select>
            <Button onClick={handleAddEvent} className="w-full">
              ➕ Ajouter l'événement
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Liste de TOUS les événements du mois */}
      <Card>
        <CardHeader>
          <CardTitle>📋 Événements du mois</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {events.length === 0 ? (
            <p className="text-center text-gray-500">Aucun événement pour ce mois.</p>
          ) : (
            events.map((event, idx) => (
              <div key={idx} className={`p-2 rounded ${getColor(event.type)}`}>
                <strong>{new Date(event.date).toLocaleDateString()}</strong> — {event.title} ({event.type})
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
