const express = require("express");
const cors = require("cors");
const json = require("./employees.js");
const app = express();
const port = process.env.PORT || 3001; // Port du serveur

// Liste des origines autorisées (local + déploiement)
const allowedOrigins = [
  "http://localhost:5173", // Frontend local
  "http://localhost:5174", // Autre port local
  "https://wealth-health-front.vercel.app", // Frontend déployé
  "https://wealth-health-back.vercel.app", // Backend déployé
];

// Configuration CORS dynamique
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Autorise l'accès
      } else {
        callback(new Error("Not allowed by CORS")); // Bloque l'accès
      }
    },
  })
);

// Middleware pour traiter les données JSON envoyées par le frontend
app.use(express.json());

// Endpoint pour recevoir les données et les stocker dans un fichier JSON
app.post("/api/employees", (req, res) => {
  const newEmployee = req.body;

  // Ajouter les nouvelles données
  json.push(newEmployee);

  res.status(201).json({ message: "Données sauvegardées avec succès" });
});

// Endpoint pour récupérer les employés
app.get("/api/employees", (req, res) => {
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
