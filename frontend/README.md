# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 🚀 TechSpace Solutions - Système de Réservation de Salle

Une application Fullstack moderne permettant aux collaborateurs de réserver une salle de réunion de manière fluide et intuitive. L'application gère les collisions de créneaux en temps réel et offre une interface responsive.

## 🛠️ Stack Technique

- **Frontend:** React.js, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js
- **Base de données:** MySQL
- **Authentification:** JSON Web Tokens (JWT) & Bcrypt

## 📁 Structure du Projet

```text
RESERVATION-SALLE/
├── backend/                # API REST Node.js
│   ├── config/             # Connexion DB (db.js)
│   ├── controllers/        # Logique métier (auth, reservations)
│   ├── middlewares/        # Protections des routes (JWT)
│   ├── models/             # Schémas de données
│   ├── routes/             # Définition des endpoints API
│   └── server.js           # Point d'entrée du serveur
└── frontend/               # Interface Utilisateur React
    ├── src/
    │   ├── components/     # Composants réutilisables (Header, Footer)
    │   ├── hooks/          # Logique d'authentification personnalisée
    │   ├── pages/          # Dashboard, Profile, Login, Register
    │   └── services/       # Client API (api.js)

🚀 Installation et Démarrage
1. Prérequis
Node.js installé

Un serveur MySQL actif

2. Configuration de la Base de Données
Crée une base de données nommée resa-salle.

Importe le fichier backend/schema.sql pour créer les tables users et reservations.

3. Configuration du Backend
Entre dans le dossier backend : cd backend

Installe les dépendances : npm install

Crée un fichier .env basé sur .env.example (cp .env.example .env) et remplis tes accès :

Extrait de code
PORT=5000
DB_HOST=localhost
DB_USER=ton_user
DB_PASS=ton_password
DB_NAME=resa_salle
JWT_SECRET=ta_cle_secrete
Lance le serveur : npm run dev 

4. Configuration du Frontend
Entre dans le dossier frontend : cd frontend

Installe les dépendances : npm install

Lance l'application : npm run dev

Accède à l'app via http://localhost:5173

✨ Fonctionnalités
🔐 Authentification Sécurisée : Inscription et connexion avec hachage de mot de passe.

📅 Planning Interactif : Visualisation hebdomadaire des créneaux.

✍️ Gestion des Réservations : Création, modification et annulation depuis l'espace profil.

🛡️ Anti-Collision : Algorithme empêchant deux réservations de se chevaucher sur le même créneau.

📱 Responsive Design : Interface optimisée pour Desktop et Mobile.