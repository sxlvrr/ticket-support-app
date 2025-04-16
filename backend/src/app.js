const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const db = require('./models');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

app.get('/', (req, res) => {
  res.send('API Ticket Support App is running 🚀');
});

db.sequelize.sync({ alter: true }) // ⚠️ en prod : passer à { force: false }
  .then(() => console.log("✅ Base de données synchronisée"))
  .catch((err) => console.error("❌ Erreur DB:", err));

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
