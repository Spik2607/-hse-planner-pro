import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function AddAnomalyForm({ onSubmit }) {
  const [form, setForm] = useState({
    date: "",
    zone: "",
    type: "",
    gravite: "",
    responsable: "",
    action: "",
    deadline: "",
    photo: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
    setForm({ date: "", zone: "", type: "", gravite: "", responsable: "", action: "", deadline: "", photo: null });
  };

  return (
    <Card className="mt-4">
      <CardHeader><CardTitle>Nouvelle Anomalie</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="Date" />
          <Input value={form.zone} onChange={(e) => setForm({ ...form, zone: e.target.value })} placeholder="Zone concernée" />
          <Input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} placeholder="Type d'anomalie" />
          <Input value={form.gravite} onChange={(e) => setForm({ ...form, gravite: e.target.value })} placeholder="Gravité" />
          <Input value={form.responsable} onChange={(e) => setForm({ ...form, responsable: e.target.value })} placeholder="Responsable" />
          <Input value={form.action} onChange={(e) => setForm({ ...form, action: e.target.value })} placeholder="Action corrective" />
          <Input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} placeholder="Date limite" />
          <input type="file" onChange={(e) => setForm({ ...form, photo: e.target.files[0] })} />
          <Button type="submit" variant="solid" className="w-full">Enregistrer</Button>
        </form>
      </CardContent>
    </Card>
  );
}
