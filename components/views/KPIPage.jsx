import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function KPIPage() {
  const data = [
    { mois: 'Jan', tf: 10, tg: 2 },
    { mois: 'Fév', tf: 8, tg: 1.8 },
    { mois: 'Mars', tf: 9, tg: 2.2 },
    { mois: 'Avril', tf: 6, tg: 1.5 }
  ];

  return (
    <Card>
      <CardHeader><CardTitle>📈 Indicateurs TF / TG</CardTitle></CardHeader>
      <CardContent>
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mois" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="tf" stroke="#8884d8" />
          <Line type="monotone" dataKey="tg" stroke="#82ca9d" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
