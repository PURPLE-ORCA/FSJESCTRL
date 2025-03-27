# Documentation Développeur

## Introduction
FSJESStockManager est construit avec **Laravel, Inertia.js, React et PostgreSQL**. Ce guide fournit une vue d'ensemble de l'architecture, du schéma de base de données, des points de terminaison API et des stratégies de mise en cache.

## Stack Technologique
- **Backend :** Laravel 12 (PHP 8.1+)
- **Frontend :** React avec Inertia.js
- **Base de données :** PostgreSQL
- **Style :** Tailwind CSS
- **Authentification :** Laravel Breeze

## Structure du Projet
```
FSJESStockManager/
│── app/              # Logique backend Laravel
│── database/         # Migrations et seeders
│── resources/js/     # Composants frontend React
│── routes/          
│   ├── web.php       # Routes web
│   ├── api.php       # Routes API
│── public/           # Fichiers publics
│── storage/          # Logs et fichiers uploadés
│── .env.example      # Variables d'environnement
```

## Schéma de Base de Données
### Tables
- **services** (id, name, description, type, timestamps)
- **products** (id, name, serial_number, supplier, price, timestamps)
- **users** (id, name, email, email_verified_at, password, role_id, service_id, remember_token, timestamps)
- **movements** (id, product_id, from_service_id, to_service_id, movement_date, user_id, note, timestamps)
- **actions** (id, product_id, user_id, action, details, timestamps)
- **notifications** (id, user_id, type, message, is_read, read_at, timestamps)
- **help_requests** (id, user_id, product_id, description, status, timestamps)

## Points de terminaison API
### Authentification
- `POST /login` → Authentifier un utilisateur
- `POST /logout` → Déconnecter un utilisateur

### Gestion du Stock
- `GET /products` → Lister tous les produits
- `POST /products` → Créer un nouveau produit
- `PUT /products/{id}` → Mettre à jour un produit
- `DELETE /products/{id}` → Supprimer un produit

### Services
- `GET /services` → Lister tous les services
- `POST /services` → Créer un nouveau service
- `PUT /services/{id}` → Mettre à jour un service
- `DELETE /services/{id}` → Supprimer un service

### Mouvements
- `GET /movements` → Voir tous les mouvements
- `POST /movements` → Enregistrer un mouvement
- `GET /movements/export` → Exporter les données des mouvements

### Actions
- `GET /actions` → Voir toutes les actions
- `POST /actions` → Enregistrer une nouvelle action

### Demandes d'Assistance
- `GET /help-requests` → Voir toutes les demandes
- `POST /help-requests` → Soumettre une demande
- `PUT /help-requests/{id}/status` → Mettre à jour le statut d'une demande
- `GET /help-requests/pending-count` → Nombre de demandes en attente
- `POST /help-requests/mark-as-read` → Marquer toutes les demandes comme lues

## Stratégie de Mise en Cache
- **Données du Stock :** Mise en cache pour **5 minutes** via Laravel Cache.
- **Analytique :** Mise en cache avec mises à jour quotidiennes via Redis.

## Configuration pour le Développement
1. Cloner le dépôt et installer les dépendances.
2. Configurer le fichier `.env` avec les informations de la base de données.
3. Exécuter les migrations et insérer les données : `php artisan migrate --seed`
4. Démarrer le serveur local : `php artisan serve`

---
Pour plus de détails sur l'installation, consultez le [Guide d'Installation](installation-guide.md).
