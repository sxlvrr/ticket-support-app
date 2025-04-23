CREATE DATABASE support_tickets;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  mot_de_passe VARCHAR(255),
  role ENUM('Employe', 'Technicien', 'Admin'),
  date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255),
  description TEXT,
  statut ENUM('Ouvert', 'En cours', 'Résolu', 'Fermé') DEFAULT 'Ouvert',
  priorite ENUM('Faible', 'Moyenne', 'Élevée', 'Critique') DEFAULT 'Faible',
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_mise_a_jour DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  id_employe INT,
  id_technicien INT,
  FOREIGN KEY (id_employe) REFERENCES users(id),
  FOREIGN KEY (id_technicien) REFERENCES users(id)
);
