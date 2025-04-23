// backend/server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

// Import des routes
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/tickets', ticketRoutes);

// Route test
app.get('/', (req, res) => {
  res.send('API Support Tickets OK ✅');
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
