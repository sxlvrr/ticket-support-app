const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/db');
const User = require('./models/userModel');
const Ticket = require('./models/ticketModel');
const ticketRoutes = require('./routes/ticketRoutes');
require('dotenv').config();

// Synchronisation des modèles avec la base de données
sequelize.sync({ force: false })  // force: false ne supprime pas les données existantes
  .then(() => console.log('Base de données synchronisée avec succès !'))
  .catch((error) => console.log('Erreur de synchronisation : ', error));

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

app.get('/', (req, res) => {
  res.send('API Ticket Support App is running 🚀');
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
