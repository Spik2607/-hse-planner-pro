import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function EnvironnementPage() {
  // Structure commune pour checklist
  const createChecklist = (questions) => questions.map(q => ({ question: q, answer: null }));

  // États pour chaque checklist
  const [poussiereChecklist, setPoussiereChecklist] = useState(
    createChecklist([
      "Présence visible de poussières sur site",
      "Dispositif anti-poussières fonctionnel",
      "Zones de stockage couvertes"
    ])
  );

  const [eauxChecklist, setEauxChecklist] = useState(
    createChecklist([
      "Présence d'écoulements anormaux",
      "Système de traitement des eaux opérationnel",
      "Pas de pollution visible autour des bassins"
    ])
  );

  const [plantesChecklist, setPlantesChecklist] = useState(
    createChecklist([
      "Présence de plantes invasives détectée",
      "Zones traitées correctement",
      "Barrières écologiques respectées"
    ])
  );

  const [especesChecklist, setEspecesChecklist] = useState(
    createChecklist([
      "Observation d'espèces protégées",
      "Mesures de protection mises en place",
      "Zones sensibles balisées"
    ])
  );

  // Fonction pour modifier la réponse
  const setAnswer = (list, setList, index, value) => {
    const updated = [...list];
    updated[index].answer = value;
    setList(updated);
  };

  // Fonction de validation d'une checklist
  const validateChecklist = (checklist) => {
    const incomplete = checklist.some(q => q.answer === null);
    if (incomplete) {
      alert("Merci de répondre à toutes les questions avant de valider !");
    } else {
      alert("✅ Inspection validée !");
    }
  };

  // Bloc commun pour afficher une checklist
  const ChecklistBlock = ({ title, list, setList }) => (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {list.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center border p-2 rounded">
            <span>{item.question}</span>
            <div className="flex gap-2">
              <Button size="sm" variant={item.answer === true ? "solid" : "outline"} onClick={() => setAnswer(list, setList, idx, true)}>Oui</Button>
              <Button size="sm" variant={item.answer === false ? "destructive" : "outline"} onClick={() => setAnswer(list, setList, idx, false)}>Non</Button>
            </div>
          </div>
        ))}
        <Button className="w-full mt-4" onClick={() => validateChecklist(list)}>Valider la checklist</Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ChecklistBlock title="🌬️ Inspection Poussières" list={poussiereChecklist} setList={setPoussiereChecklist} />
      <ChecklistBlock title="🌊 Inspection Eaux" list={eauxChecklist} setList={setEauxChecklist} />
      <ChecklistBlock title="🌿 Inspection Plantes Invasives" list={plantesChecklist} setList={setPlantesChecklist} />
      <ChecklistBlock title="🐦 Inspection Espèces Protégées" list={especesChecklist} setList={setEspecesChecklist} />
    </div>
  );
}
