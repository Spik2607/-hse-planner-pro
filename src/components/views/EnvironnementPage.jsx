import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { getChecklists, addChecklist, validateChecklist } from "../../services/checklistsService";

export default function EnvironnementPage() {
  const [checklists, setChecklists] = useState([]);
  const [newChecklist, setNewChecklist] = useState({ title: "", items: [] });
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetchChecklists();
  }, []);

  const fetchChecklists = async () => {
    const data = await getChecklists();
    setChecklists(data);
  };

  const handleAddChecklist = async () => {
    if (newChecklist.title && newChecklist.items.length > 0) {
      await addChecklist(newChecklist.title, newChecklist.items);
      setNewChecklist({ title: "", items: [] });
      setNewItem("");
      fetchChecklists();
    }
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      setNewChecklist({
        ...newChecklist,
        items: [...newChecklist.items, { question: newItem, answer: null }],
      });
      setNewItem("");
    }
  };

  const handleValidate = async (id) => {
    await validateChecklist(id);
    fetchChecklists();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Créer une checklist environnement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input
            placeholder="Titre de la checklist"
            value={newChecklist.title}
            onChange={(e) => setNewChecklist({ ...newChecklist, title: e.target.value })}
          />
          <div className="flex gap-2">
            <Input
              placeholder="Nouvelle question"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
            />
            <Button onClick={handleAddItem}>Ajouter</Button>
          </div>
          <Button onClick={handleAddChecklist} className="w-full mt-2">
            Enregistrer la checklist
          </Button>
        </CardContent>
      </Card>

      {/* Listage des checklists */}
      {checklists.map((check, i) => (
        <Card key={i}>
          <CardHeader><CardTitle>{check.title}</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {check.items?.map((item, idx) => (
              <div key={idx} className="p-2 bg-gray-100 rounded">{item.question}</div>
            ))}
            {!check.validated && (
              <Button onClick={() => handleValidate(check.id)} className="w-full">
                ✅ Valider
              </Button>
            )}
            {check.validated && (
              <div className="text-green-600 text-center font-semibold">Checklist validée</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
