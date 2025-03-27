# Installation Guide

## Prerequisites
Before installing FSJESCTRL, ensure you have the following installed:

- PHP 8.1+
- Composer
- Node.js & npm
- Git
- A web server (Apache/Nginx)

## Step 1: Clone the Repository
```sh
git clone https://github.com/PURPLE-ORCA/FSJESCTRL.git
cd FSJESCTRL
```

## Step 2: Install Dependencies
Run the following commands to install PHP and JavaScript dependencies:
```sh
composer install
npm install && npm run build
```

## Step 3: Set Up Environment Variables
Copy the `.env.example` file and configure the environment variables:
```sh
cp .env.example .env
```
Then update database credentials and other settings in the `.env` file.

## Step 4: Generate Application Key
```sh
php artisan key:generate
```

## Step 5: Set Up the Database
Run migrations and seed the database:
```sh
php artisan migrate --seed
```

## Step 6: Start the Server
```sh
php artisan serve
```
Access the app at `http://127.0.0.1:8000`.

---