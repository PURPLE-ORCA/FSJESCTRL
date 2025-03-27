# Guide d'Installation

## Prérequis
Avant d'installer FSJESCTRL, assurez-vous d'avoir les éléments suivants installés :

- PHP 8.1+
- Composer
- Node.js & npm
- Git
- Un serveur web (Apache/Nginx)

## Étape 1 : Cloner le Dépôt
```sh
git clone https://github.com/PURPLE-ORCA/FSJESCTRL.git
cd FSJESCTRL
```

## Étape 2 : Installer les Dépendances
Exécutez les commandes suivantes pour installer les dépendances PHP et JavaScript :
```sh
composer install
npm install && npm run build
```

## Étape 3 : Configurer les Variables d'Environnement
Copiez le fichier `.env.example` et configurez les variables d'environnement :
```sh
cp .env.example .env
```
Ensuite, mettez à jour les informations de la base de données et les autres paramètres dans le fichier `.env`.

## Étape 4 : Générer la Clé de l'Application
```sh
php artisan key:generate
```

## Étape 5 : Configurer la Base de Données
Exécutez les migrations et insérez les données :
```sh
php artisan migrate --seed
```

## Étape 6 : Démarrer le Serveur
```sh
php artisan serve
```
Accédez à l'application à l'adresse `http://127.0.0.1:8000`.

---
