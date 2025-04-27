import React, { useState, useEffect } from "react";
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
    const loaded = await getChecklists();
    setChecklists(loaded);
  };

  const handleAddChecklist = async () => {
    if (newChecklist.title.trim() && newChecklist.items.length > 0) {
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

  const handleValidateChecklist = async (id) => {
    await validateChecklist(id);
    fetchChecklists();
  };

  return (
    <div className="space-y-6">
      {/* Formulaire création checklist */}
      <Card>
        <CardHeader>
          <CardTitle>➕ Créer Nouvelle Checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Titre checklist (ex: Inspection Poussières)"
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
            <Button onClick={handleAddItem}>Ajouter Question</Button>
          </div>
          <Button className="w-full" onClick={handleAddChecklist}>
            ➕ Créer Checklist
          </Button>
        </CardContent>
      </Card>

      {/* Affichage Checklists existantes */}
      {checklists.map((check, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle>{check.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {check.items && check.items.length > 0 && check.items.map((item, idx2) => (
              <div key={idx2} className="p-2 bg-gray-100 rounded">
                {item.question}
              </div>
            ))}
            {!check.validated && (
              <Button className="w-full mt-2" onClick={() => handleValidateChecklist(check.id)}>
                ✅ Valider Checklist
              </Button>
            )}
            {check.validated && (
              <div className="text-green-600 font-bold text-center mt-2">Checklist Validée</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
