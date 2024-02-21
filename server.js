const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 4000;

// Configuration de la connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "iot",
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

app.use(bodyParser.json());
app.use(cors());

app.post("/api/data", (req, res) => {
  const formData = req.body;

  // Insérer les données dans la table de la base de données
  const sql = "INSERT INTO agendaInfo (date, time, text) VALUES (?, ?, ?)";
  const values = [formData.date, formData.time, formData.text];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Erreur lors de l'insertion des données :", err);
      res
        .status(500)
        .send("Erreur lors de l'insertion des données dans la base de données");
      return;
    }
    console.log("Données insérées avec succès dans la base de données");
    res
      .status(200)
      .send("Données insérées avec succès dans la base de données");
  });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
