import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function FichesView() {
  const [fiches, setFiches] = useState([]);
  const [newFiche, setNewFiche] = useState({
    type: "", description: "", responsable: "", date: "", statut: "En cours"
  });

  const addFiche = () => {
    if (newFiche.type && newFiche.description && newFiche.date) {
      setFiches([newFiche, ...fiches]);
      setNewFiche({ type: "", description: "", responsable: "", date: "", statut: "En cours" });
    }
  };

  const deleteFiche = (index) => setFiches(fiches.filter((_, i) => i !== index));
  const toggleStatus = (index) => {
    const updated = [...fiches];
    updated[index].statut = updated[index].statut === "En cours" ? "Corrigée" : "En cours";
    setFiches(updated);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Fiches Action HSE</CardTitle>
        <Button variant="solid" onClick={addFiche}>+ Ajouter</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Type" value={newFiche.type} onChange={(e) => setNewFiche({ ...newFiche, type: e.target.value })} />
        <Input placeholder="Description" value={newFiche.description} onChange={(e) => setNewFiche({ ...newFiche, description: e.target.value })} />
        <Input placeholder="Responsable" value={newFiche.responsable} onChange={(e) => setNewFiche({ ...newFiche, responsable: e.target.value })} />
        <Input type="date" value={newFiche.date} onChange={(e) => setNewFiche({ ...newFiche, date: e.target.value })} />
      </CardContent>
    </Card>
  );
}
