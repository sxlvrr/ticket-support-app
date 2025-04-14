// src/models/ticketModel.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assurez-vous que la connexion à la base de données est correcte

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  statut: {
    type: DataTypes.ENUM,
    values: ['Ouvert', 'En cours', 'Résolu', 'Fermé'],
    defaultValue: 'Ouvert'
  },
  priorite: {
    type: DataTypes.ENUM,
    values: ['Faible', 'Moyenne', 'Élevée', 'Critique'],
    defaultValue: 'Moyenne'
  },
  date_creation: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  date_mise_a_jour: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  id_employe: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_technicien: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

module.exports = Ticket;
