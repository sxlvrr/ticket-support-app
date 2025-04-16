module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Commentaire', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    contenu: DataTypes.TEXT,
    date_commentaire: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });
};
