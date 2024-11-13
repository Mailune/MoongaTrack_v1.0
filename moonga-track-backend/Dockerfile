# Dockerfile - Backend

# Utilisez une image de base Node.js stable (v18 LTS)
FROM node:18

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez uniquement les fichiers de dépendances et installez-les
COPY package*.json ./

# Installez toutes les dépendances
RUN npm install

# Copiez le reste de l’application
COPY . .

# Exposez le port sur lequel le backend tourne (5005)
EXPOSE 5005

# Commande pour démarrer l’application backend
CMD ["node", "server.js"]
