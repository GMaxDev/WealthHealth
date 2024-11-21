const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path"); // Import de path pour gérer les chemins
const app = express();
const port = process.env.PORT || 3001; // Port du serveur

// Chemin vers le fichier JSON des employés
const employeesFilePath = path.join(__dirname, "../data/employees.json");

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

  // Lire le fichier JSON, ajouter l'employé, puis réécrire le fichier
  fs.readFile(employeesFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de la lecture du fichier" });
    }

    const employees = JSON.parse(data);
    employees.push(newEmployee);

    // Sauvegarder les nouveaux employés dans le fichier JSON
    fs.writeFile(employeesFilePath, JSON.stringify(employees, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Erreur lors de la sauvegarde du fichier" });
      }
      res.status(201).json({ message: "Données sauvegardées avec succès" });
    });
  });
});

// **Nouvel endpoint pour récupérer les employés**
app.get("/data/employees", (req, res) => {
  // Lire le fichier JSON et retourner les employés
  fs.readFile(employeesFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de la lecture du fichier" });
    }
    const employees = JSON.parse(data);
    res.json(employees || []);
  });
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
