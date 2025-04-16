module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Utilisateur', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    mot_de_passe: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('Employé', 'Technicien', 'Admin'), defaultValue: 'Employé' },
    date_inscription: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });
};
