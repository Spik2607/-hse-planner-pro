import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ChecklistEauxBoosted() {
  const [controls, setControls] = useState([
    { question: "Présence de flaques d'eaux stagnantes ?", answer: null },
    { question: "Système d'évacuation des eaux fonctionnel ?", answer: null },
    { question: "Pollution visible (huiles, produits chimiques) ?", answer: null }
  ]);
  const [notes, setNotes] = useState("");
  const [inspector, setInspector] = useState("");
  const [zone, setZone] = useState("");
  const [status, setStatus] = useState("");

  const validateChecklist = () => {
    const hasAnomaly = controls.some(c => c.answer === false);
    setStatus(hasAnomaly ? "Non Conforme" : "Conforme");
  };

  const setAnswer = (index, value) => {
    const updated = [...controls];
    updated[index].answer = value;
    setControls(updated);
  };

  return (
    <Card>
      <CardHeader><CardTitle>Check-list Gestion des Eaux (Boostée)</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Input placeholder="Nom de l'inspecteur" value={inspector} onChange={(e) => setInspector(e.target.value)} />
          <Input placeholder="Zone inspectée" value={zone} onChange={(e) => setZone(e.target.value)} />
        </div>

        {controls.map((c, i) => (
          <div key={i} className="border p-3 rounded">
            <p>{c.question}</p>
            <div className="flex gap-2 mt-2">
              <Button variant={c.answer === true ? "solid" : "outline"} onClick={() => setAnswer(i, true)}>Oui</Button>
              <Button variant={c.answer === false ? "destructive" : "outline"} onClick={() => setAnswer(i, false)}>Non</Button>
            </div>
          </div>
        ))}

        <textarea
          className="border rounded p-2 w-full"
          placeholder="Observations complémentaires..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <Button className="w-full mt-4" onClick={validateChecklist}>Valider la Check-list</Button>

        {status && (
          <div className={`mt-4 p-3 rounded text-center ${status === "Conforme" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            Résultat : {status}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
