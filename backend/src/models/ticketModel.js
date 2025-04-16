module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Ticket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titre: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    statut: {
      type: DataTypes.ENUM('Ouvert', 'En cours', 'Résolu', 'Fermé'),
      defaultValue: 'Ouvert',
    },
    priorite: {
      type: DataTypes.ENUM('Faible', 'Moyenne', 'Élevée', 'Critique'),
      defaultValue: 'Moyenne',
    },
    date_creation: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    date_mise_a_jour: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });
};
