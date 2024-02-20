const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/enregistrer", (req, res) => {
  // Logique pour enregistrer les données dans la base de données
  const { date, time, text } = req.body;
  // Effectuez l'enregistrement dans la base de données ici

  // Envoyer une réponse de succès
  res.status(200).json({ message: "Données enregistrées avec succès." });
});

app.listen(port, () => {
  console.log(`Serveur API démarré sur le port ${port}`);
});
