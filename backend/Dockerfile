# Utilise l'image officielle de Node.js comme base
FROM node:16

# Crée et définit le répertoire de travail
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tout le reste du code de l'application
COPY . .

# Expose le port sur lequel l'app va tourner
EXPOSE 3001

# Démarre l'application
CMD ["npm", "start"]
