// src/controllers/ticketController.js

const Ticket = require('../models/ticketModel');

// Créer un ticket
exports.createTicket = async (req, res) => {
  try {
    const { titre, description, priorite, id_employe } = req.body;
    const newTicket = await Ticket.create({
      titre,
      description,
      priorite,
      id_employe,
      statut: 'Ouvert', // Par défaut
    });
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du ticket' });
  }
};

// Récupérer tous les tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des tickets' });
  }
};

// Récupérer un ticket par ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (ticket) {
      res.status(200).json(ticket);
    } else {
      res.status(404).json({ error: 'Ticket non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du ticket' });
  }
};

// Mettre à jour un ticket
exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (ticket) {
      const { statut, date_mise_a_jour, id_technicien } = req.body;
      await ticket.update({ statut, date_mise_a_jour, id_technicien });
      res.status(200).json(ticket);
    } else {
      res.status(404).json({ error: 'Ticket non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du ticket' });
  }
};

// Supprimer un ticket
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    if (ticket) {
      await ticket.destroy();
      res.status(200).json({ message: 'Ticket supprimé' });
    } else {
      res.status(404).json({ error: 'Ticket non trouvé' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du ticket' });
  }
};
