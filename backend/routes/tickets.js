// backend/routes/tickets.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// ➤ POST /tickets : création d’un ticket
router.post('/', (req, res) => {
  const { titre, description, priorité, id_employe } = req.body;

  if (!titre || !description || !priorité || !id_employe) {
    return res.status(400).json({ message: 'Champs requis manquants ❌' });
  }

  const sql = `
    INSERT INTO tickets (titre, description, priorité, id_employe)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [titre, description, priorité, id_employe], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de la création du ticket ❌' });
    }

    res.status(201).json({ message: 'Ticket créé avec succès ✅', id_ticket: result.insertId });
  });
});

// ➤ GET /tickets : récupérer tous les tickets
router.get('/', (req, res) => {
  const sql = `
    SELECT t.id, t.titre, t.description, t.statut, t.priorité,
           t.date_creation, t.date_mise_a_jour,
           u.nom AS nom_employe, u.email AS email_employe
    FROM tickets t
    JOIN users u ON t.id_employe = u.id
    ORDER BY t.date_creation DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de la récupération des tickets ❌' });
    }

    res.status(200).json(results);
  });
});

// ➤ PUT /tickets/:id : mise à jour d’un ticket
router.put('/:id', (req, res) => {
  const ticketId = req.params.id;
  const { statut, priorité, id_technicien } = req.body;

  if (!statut && !priorité && !id_technicien) {
    return res.status(400).json({ message: 'Aucun champ à mettre à jour ❌' });
  }

  const champs = [];
  const valeurs = [];

  if (statut) {
    champs.push('statut = ?');
    valeurs.push(statut);
  }
  if (priorité) {
    champs.push('priorité = ?');
    valeurs.push(priorité);
  }
  if (id_technicien) {
    champs.push('id_technicien = ?');
    valeurs.push(id_technicien);
  }

  valeurs.push(ticketId);

  const sql = `UPDATE tickets SET ${champs.join(', ')}, date_mise_a_jour = NOW() WHERE id = ?`;

  db.query(sql, valeurs, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de la mise à jour du ticket ❌' });
    }

    res.status(200).json({ message: 'Ticket mis à jour avec succès ✅' });
  });
});

// ➤ GET /tickets/:id : voir un seul ticket
router.get('/:id', (req, res) => {
  const ticketId = req.params.id;

  const sql = `
    SELECT t.id, t.titre, t.description, t.statut, t.priorité,
           t.date_creation, t.date_mise_a_jour,
           u.nom AS nom_employe, u.email AS email_employe,
           tech.nom AS nom_technicien, tech.email AS email_technicien
    FROM tickets t
    JOIN users u ON t.id_employe = u.id
    LEFT JOIN users tech ON t.id_technicien = tech.id
    WHERE t.id = ?
  `;

  db.query(sql, [ticketId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de la récupération du ticket ❌' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Ticket introuvable ❌' });
    }

    res.status(200).json(results[0]);
  });
});

// ➤ DELETE /tickets/:id : suppression d’un ticket
router.delete('/:id', (req, res) => {
  const ticketId = req.params.id;

  const sql = 'DELETE FROM tickets WHERE id = ?';

  db.query(sql, [ticketId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors de la suppression du ticket ❌' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Ticket introuvable ❌' });
    }

    res.status(200).json({ message: 'Ticket supprimé avec succès ✅' });
  });
});

module.exports = router;
