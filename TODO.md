# Cahier des Charges - Application de Notation et Classement en Temps Réel pour l'open-innovation de l'école EpsiWis.

## 1. Présentation du Projet
### 1.1 Contexte
L'application permet d'attribuer des notes à des groupes et de suivre en temps réel leur évolution dans un classement dynamique, à l'image de Kahoot.

### 1.2 Objectifs
- Permettre aux visiteurs de l'open-innovation d'attribuer des notes à des groupes.
- Offrir une interface fluide pour consulter en temps réel le classement.
- Gérer l'authentification et l'autorisation des utilisateurs par un système de magic-link pour une authentification rapide et sécurisée.
- Fournir un design ergonomique et responsive.

## 2. Technologies Utilisées
- **Frontend** : Next.js 15, TailwindCSS, ShadCN UI
- **Backend** : Next.js API routes, Prisma ORM, PostgreSQL
- **Authentification** : BetterAuth
- **Emails & Notifications** : Resend, React-Email
- **Déploiement** : Coolify / Hostinger

## 3. Fonctionnalités

### 3.1 Gestion des Utilisateurs
- Inscription et connexion via BetterAuth (Magic-link).

### 3.2 Attribution des Notes
- Interface permettant aux visiteurs de l'open-innovation d'attribuer des notes aux groupes.
- Possibilité d'attribuer une seule note par groupe.

### 3.3 Classement Dynamique
- Affichage en temps réel de l'évolution du classement des groupes.
- Mise à jour automatique des positions en fonction des notes attribuées.