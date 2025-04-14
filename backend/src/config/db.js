const { Pool } = require('pg');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ PostgreSQL connection error", err));

module.exports = pool;

// Connexion à la base de données PostgreSQL
const sequelize = new Sequelize('ticket_support', 'postgres', 'postgres', {
    host: 'db', // Nom du service du conteneur dans docker-compose
    dialect: 'postgres',
    logging: false, // Désactive les logs SQL dans la console
  });
  
  module.exports = sequelize;