const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');  // Import de path pour gérer les chemins
const app = express();
const port = process.env.PORT || 3001; // Port du serveur

// Utilisation de CORS pour autoriser les requêtes depuis le frontend
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Origine du frontend
}));

// Middleware pour traiter les données JSON envoyées par le frontend
app.use(express.json());

// Je définis le chemin vers employees.json dans le dossier api
const filePath = path.join(__dirname, 'api', 'employees.json');

// Endpoint pour recevoir les données et les stocker dans un fichier JSON
app.post('/api/employees', (req, res) => {
  const newEmployee = req.body;

  // Lire le fichier existant (ou créer un nouveau fichier s'il n'existe pas)
  fs.readFile(filePath, 'utf8', (err, data) => {
    let employees = [];

    if (!err && data) {
      employees = JSON.parse(data);
    }

    // Ajouter les nouvelles données
    employees.push(newEmployee);

    // Écrire les données mises à jour dans le fichier JSON
    fs.writeFile(filePath, JSON.stringify(employees, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de l\'enregistrement des données' });
      }
      res.status(201).json({ message: 'Données sauvegardées avec succès' });
    });
  });
});

// **Nouvel endpoint pour récupérer les employés**
app.get('/api/employees', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la lecture des employés' });
    }

    res.json(JSON.parse(data || '[]'));  // Retourne les employés sous forme de JSON
  });
});

// Endpoint de test pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.send('Hello, welcome from my express server');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});
