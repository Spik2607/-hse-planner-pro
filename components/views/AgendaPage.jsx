import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function AgendaPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Card>
      <CardHeader>
        <CardTitle>📅 Agenda HSE Interactif</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="rounded-lg shadow p-2"
        />
      </CardContent>
    </Card>
  );
}
