import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import * as XLSX from "xlsx";
import PptxGenJS from "pptxgenjs";

export default function App() {
  const [data, setData] = useState([
    { name: 'Semaine 1', émissions: 400, déchets: 240 },
    { name: 'Semaine 2', émissions: 300, déchets: 139 },
    { name: 'Semaine 3', émissions: 200, déchets: 980 },
    { name: 'Semaine 4', émissions: 278, déchets: 390 },
  ]);

  const [fiches, setFiches] = useState([
    { type: "Inspection", action: "Vérifier les extincteurs", responsable: "Dupont", echeance: "2025-04-26" },
    { type: "Non-conformité", action: "Corriger le stockage des produits chimiques", responsable: "Martin", echeance: "2025-04-28" },
  ]);

  const [newFiche, setNewFiche] = useState({ type: "", action: "", responsable: "", echeance: "" });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const binaryStr = evt.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const generatePresentation = () => {
    const pptx = new PptxGenJS();
    const slide = pptx.addSlide();
    slide.addText("Indicateurs HSE", { x: 1, y: 0.5, fontSize: 24, bold: true });
    data.forEach((item, index) => {
      slide.addText(`${item.name} - Émissions: ${item.émissions}, Déchets: ${item.déchets}`, {
        x: 1,
        y: 1.2 + index * 0.4,
        fontSize: 14
      });
    });
    pptx.writeFile("HSE_Indicateurs_Presentation.pptx");
  };

  const addFiche = () => {
    if (newFiche.type && newFiche.action && newFiche.responsable && newFiche.echeance) {
      setFiches([...fiches, newFiche]);
      setNewFiche({ type: "", action: "", responsable: "", echeance: "" });
    }
  };

  return (
    <div>
      <h1>HSE Planner Pro</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <button onClick={generatePresentation}>Générer PowerPoint</button>

      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="émissions" stroke="#8884d8" />
        <Line type="monotone" dataKey="déchets" stroke="#82ca9d" />
      </LineChart>

      <h2>Fiches Action</h2>
      {fiches.map((fiche, i) => (
        <div key={i}>
          <p>{fiche.type} - {fiche.action} ({fiche.responsable}) : {fiche.echeance}</p>
        </div>
      ))}
      <input placeholder="Type" value={newFiche.type} onChange={e => setNewFiche({ ...newFiche, type: e.target.value })} />
      <input placeholder="Action" value={newFiche.action} onChange={e => setNewFiche({ ...newFiche, action: e.target.value })} />
      <input placeholder="Responsable" value={newFiche.responsable} onChange={e => setNewFiche({ ...newFiche, responsable: e.target.value })} />
      <input type="date" value={newFiche.echeance} onChange={e => setNewFiche({ ...newFiche, echeance: e.target.value })} />
      <button onClick={addFiche}>Ajouter</button>
    </div>
  );
}
