# Utilise l'image officielle Node.js
FROM node:18

# Dossier de travail dans le conteneur
WORKDIR /app

# Copie des fichiers package.json et package-lock.json
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste des fichiers
COPY . .

# Expose le port utilisé par ton serveur
EXPOSE 5000

# Commande pour lancer ton backend
CMD ["node", "server.js"]
