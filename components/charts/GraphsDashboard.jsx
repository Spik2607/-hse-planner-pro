import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { name: "Jan", anomalies: 2, corrections: 1 },
  { name: "Fév", anomalies: 4, corrections: 2 },
  { name: "Mars", anomalies: 5, corrections: 4 },
  { name: "Avril", anomalies: 1, corrections: 1 },
];

export default function GraphsDashboard() {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="anomalies" stroke="#8884d8" />
      <Line type="monotone" dataKey="corrections" stroke="#82ca9d" />
    </LineChart>
  );
}
