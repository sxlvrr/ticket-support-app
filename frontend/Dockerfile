# Utilise l'image officielle de Node.js pour construire l'application
FROM node:16 as build

# Crée et définit le répertoire de travail
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste du code
COPY . .

# Construit l'application pour la production
RUN npm run build

# Utilise un serveur statique pour servir l'application
FROM nginx:alpine

# Copie les fichiers de build dans le dossier de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose le port 80
EXPOSE 80

# Démarre Nginx
CMD ["nginx", "-g", "daemon off;"]
