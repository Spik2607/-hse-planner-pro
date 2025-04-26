import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export default function ExportRapportPage() {
  const exportExcel = () => {
    alert("Export Excel en construction...");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exporter Rapport HSE</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="solid" onClick={exportExcel}>
          📤 Exporter en Excel
        </Button>
      </CardContent>
    </Card>
  );
}
