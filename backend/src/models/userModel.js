const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assurez-vous que vous avez configuré sequelize

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('Employé', 'Technicien', 'Admin'),
    defaultValue: 'Employé',
  },
}, {
  timestamps: true,
  tableName: 'users',
});

module.exports = User;
