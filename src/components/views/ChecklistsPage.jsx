import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export default function ChecklistsPage() {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Check-lists Environnementales</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="solid">🌬️ Poussières</Button>
        <Button variant="solid">🌊 Gestion des Eaux</Button>
        <Button variant="solid">🌿 Plantes Invasives</Button>
        <Button variant="solid">🐦 Espèces Protégées</Button>
      </CardContent>
    </Card>
  );
}