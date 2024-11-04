# Dockerfile - Frontend

# Utilisez une image de base Node.js
FROM node:18

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers de dépendances et installez-les
COPY package*.json ./
RUN npm install

# Copiez le reste de l’application
COPY . .

# Copiez le fichier .env pour que les variables d'environnement soient accessibles dans le frontend
COPY .env .env

# Construisez l’application pour la production
RUN npm run build

# Exposez le port sur lequel le frontend tourne (3000)
EXPOSE 3000

# Commande pour démarrer le serveur de production
CMD ["npm", "start"]
