# --- Étape 1 : Construction de l'application Node.js ---
# Utilisation d'une image Node.js basée sur Debian (buster-slim) pour la compatibilité avec FFmpeg
FROM node:lts-slim as build

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json pour installer les dépendances
# Cela permet à Docker de mettre en cache cette étape si ces fichiers ne changent pas
COPY package*.json ./

# Installe toutes les dépendances Node.js (y compris les devDependencies si nécessaire pour la compilation)
# Utilise npm ci pour des builds reproductibles
RUN npm ci

# Copie le reste du code source de l'application dans le répertoire de travail
COPY . .

# Si votre application Node.js nécessite une étape de "build" (ex: transpilation TypeScript, bundling Webpack),
# décommentez la ligne suivante et ajustez-la
RUN npm run build

# --- Étape 2 : Image finale avec FFmpeg et l'application ---
# Utilise la même image de base Node.js pour assurer la cohérence et avoir Node.js pré-installé
FROM node:lts-slim

# Définit le répertoire de travail pour l'image finale
WORKDIR /app


# Installation de FFmpeg
# Met à jour les listes de paquets et installe ffmpeg
# && rm -rf /var/lib/apt/lists/* permet de nettoyer le cache APT pour réduire la taille de l'image
RUN apt-get update && apt-get install -y ffmpeg \
    && rm -rf /var/lib/apt/lists/*

    

# Copiez le reste de votre application
# Cette couche sera invalidée uniquement si le contenu de votre dossier change.
COPY . .
RUN npm run build
# Exposez le port sur lequel votre application écoute (si applicable)
# EXPOSE 3000

# Commande par défaut pour exécuter l'application quand le conteneur démarre
# Remplacez 'your-app.js' par le fichier d'entrée principal de votre application (ex: index.js, app.js)
CMD ["node", "dist/index.js"]
