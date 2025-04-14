// src/routes/ticketRoutes.js

const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Créer un ticket
router.post('/', ticketController.createTicket);

// Récupérer tous les tickets
router.get('/', ticketController.getAllTickets);

// Récupérer un ticket par ID
router.get('/:id', ticketController.getTicketById);

// Mettre à jour un ticket
router.put('/:id', ticketController.updateTicket);

// Supprimer un ticket
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;
