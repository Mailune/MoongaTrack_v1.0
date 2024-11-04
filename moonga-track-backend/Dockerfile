# Dockerfile - Backend

# Utilisez une image de base Node.js stable (v18 LTS)
FROM node:18

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers de dépendances et installez-les
COPY package*.json ./
RUN npm install

# Installez bcrypt spécifiquement
RUN npm install bcryptjs

# Copiez le reste de l’application
COPY . .

# Copiez le fichier .env pour que les variables d'environnement soient accessibles
COPY .env .env

# Exposez le port sur lequel le backend tourne (5005)
EXPOSE 5005

# Commande pour démarrer l’application backend
CMD ["node", "server.js"]
