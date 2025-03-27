# Developer Documentation

## Introduction
FSJESCTRL is built with **Laravel, Inertia.js, React, and PostgreSQL**. This guide provides an overview of the architecture, database schema, API endpoints, and caching strategies.

## Tech Stack
- **Backend:** Laravel 11 (PHP 8.1+)
- **Frontend:** React with Inertia.js
- **Database:** PostgreSQL
- **Styling:** Tailwind CSS
- **Authentication:** Laravel Breeze

## Project Structure
```
FSJESCTRL/
│── app/              # Laravel backend logic
│── database/         # Migrations and seeders
│── resources/js/     # React frontend components
│── routes/          
│   ├── web.php       # Web routes
│── public/           # Public assets
│── storage/          # Logs & uploaded files
│── .env.example      # Environment variables
```

## Database Schema
### Tables
- **services** (id, name, description, type, timestamps)
- **products** (id, name, serial_number, supplier, price, timestamps)
- **users** (id, name, email, email_verified_at, password, role_id, service_id, remember_token, timestamps)
- **movements** (id, product_id, from_service_id, to_service_id, movement_date, user_id, note, timestamps)
- **actions** (id, product_id, user_id, action, details, timestamps)
- **notifications** (id, user_id, type, message, is_read, read_at, timestamps)
- **help_requests** (id, user_id, product_id, description, status, timestamps)

## API Endpoints
### Authentication
- `POST /login` → Authenticate user
- `POST /logout` → Logout user

### Stock Management
- `GET /products` → List all products
- `POST /products` → Create a new product
- `PUT /products/{id}` → Update a product
- `DELETE /products/{id}` → Delete a product

### Services
- `GET /services` → List all services
- `POST /services` → Create a new service
- `PUT /services/{id}` → Update a service
- `DELETE /services/{id}` → Delete a service

### Movements
- `GET /movements` → View all movements
- `POST /movements` → Create a movement
- `GET /movements/export` → Export movement data

### Actions
- `GET /actions` → View all actions
- `POST /actions` → Log a new action

### Help Requests
- `GET /help-requests` → View all requests
- `POST /help-requests` → Submit a request
- `PUT /help-requests/{id}/status` → Update request status
- `GET /help-requests/pending-count` → Get pending request count
- `POST /help-requests/mark-as-read` → Mark all as read

## Caching Strategy
- **Stock Data:** Cached for **5 minutes** using Laravel Cache.

## Development Setup
1. Clone the repository and install dependencies.
2. Set up the `.env` file with correct database credentials.
3. Run migrations and seed data: `php artisan migrate --seed`
4. Start the local server: `php artisan serve`

---

