const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path"); // Import de path pour gérer les chemins
const json = require("../data/employees.js");
const app = express();
const port = process.env.PORT || 3001; // Port du serveur

// Utilisation de CORS pour autoriser les requêtes depuis le frontend
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Origine du frontend
  })
);

// Middleware pour traiter les données JSON envoyées par le frontend
app.use(express.json());

// Endpoint pour recevoir les données et les stocker dans un fichier JSON
app.post("/data/employees", (req, res) => {
  const newEmployee = req.body;

  // Ajouter les nouvelles données
  json.push(newEmployee);

  res.status(201).json({ message: "Données sauvegardées avec succès" });
});

// **Nouvel endpoint pour récupérer les employés**
app.get("/data/employees", (req, res) => {
  res.json(json || "[]"); // Retourne les employés sous forme de JSON
});

// Endpoint de test pour vérifier que le serveur fonctionne
app.get("/", (req, res) => {
  res.send("Hello, welcome from my express server");
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});

module.exports = app;
