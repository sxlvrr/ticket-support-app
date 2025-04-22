# Utilise l'image officielle Node.js
FROM node:18

# Dossier de travail dans le conteneur
WORKDIR /app

# Copie des fichiers package.json
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste des fichiers
COPY . .

# Port exposé
EXPOSE 5000

# Variables d'environnement par défaut (optionnel)
ENV DB_HOST=db
ENV DB_USER=root
ENV DB_PASSWORD=exemple
ENV DB_NAME=support_tickets

# Lancer le serveur
CMD ["node", "server.js"]
