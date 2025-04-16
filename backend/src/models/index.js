const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Utilisateur = require('./userModel')(sequelize, Sequelize);
db.Ticket = require('./ticketModel')(sequelize, Sequelize.DataTypes);
db.Commentaire = require('./commentaireModel')(sequelize, Sequelize.DataTypes);

// Associations
db.Utilisateur.hasMany(db.Ticket, { foreignKey: 'id_employe', as: 'tickets_crees' });
db.Utilisateur.hasMany(db.Ticket, { foreignKey: 'id_technicien', as: 'tickets_assignes' });
db.Ticket.belongsTo(db.Utilisateur, { foreignKey: 'id_employe', as: 'createur' });
db.Ticket.belongsTo(db.Utilisateur, { foreignKey: 'id_technicien', as: 'technicien' });

db.Ticket.hasMany(db.Commentaire, { foreignKey: 'id_ticket' });
db.Commentaire.belongsTo(db.Ticket, { foreignKey: 'id_ticket' });
db.Commentaire.belongsTo(db.Utilisateur, { foreignKey: 'id_utilisateur' });

module.exports = db;
