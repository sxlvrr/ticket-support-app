// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// ➤ Route pour enregistrer un utilisateur
router.post('/register', async (req, res) => {
  const { nom, email, mot_de_passe, role } = req.body;

  if (!nom || !email || !mot_de_passe || !role) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  try {
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    const sql = 'INSERT INTO users (nom, email, mot_de_passe, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [nom, email, hashedPassword, role], (err, result) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });

      res.status(201).json({ message: 'Utilisateur enregistré ✅' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur de hashage' });
  }
});

// ➤ Route pour connecter un utilisateur
router.post('/login', (req, res) => {
  const { email, mot_de_passe } = req.body;

  if (!email || !mot_de_passe) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Email non trouvé ❌' });
    }

    const utilisateur = results[0];
    const match = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);

    if (!match) {
      return res.status(401).json({ message: 'Mot de passe incorrect ❌' });
    }

    res.status(200).json({
      message: 'Connexion réussie ✅',
      utilisateur: {
        id: utilisateur.id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role
      }
    });
  });
});

module.exports = router;
