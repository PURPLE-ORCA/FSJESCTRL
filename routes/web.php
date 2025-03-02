<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\MovementController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ServiceController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware('auth')->group(function () {
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/create', [ProductController::class, 'create'])
    ->name('products.create')
    ->middleware('can:can_manage_products');

    Route::post('/products', [ProductController::class, 'store'])
        ->name('products.store')
        ->middleware('can:can_manage_products');

    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])
    ->name('products.edit')
    ->middleware('can:can_manage_products');

    Route::put('/products/{product}', [ProductController::class, 'update'])
        ->name('products.update')
        ->middleware('can:can_manage_products');

    Route::delete('/products/{product}', [ProductController::class, 'destroy'])
        ->name('products.destroy') // Must match the route name used in frontend
        ->middleware('can:can_manage_products');

    Route::middleware('can:can_manage_users')->group(function () {
        Route::get('/users', [RegisteredUserController::class, 'index'])->name('users.index');
        Route::put('/users/{user}', [RegisteredUserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [RegisteredUserController::class, 'destroy'])->name('users.destroy');
    });

    Route::middleware('can:can_manage_services')->group(function () {
    Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
    Route::get('/services/create', [ServiceController::class, 'create'])->name('services.create');
    Route::post('/services', [ServiceController::class, 'store'])->name('services.store');
    Route::put('/services/{service}', [ServiceController::class, 'update'])->name('services.update'); 
    Route::get('/services/{service}/edit', [ServiceController::class, 'edit'])->name('services.edit');
    Route::delete('/services/{service}', [ServiceController::class, 'destroy'])->name('services.destroy');
});

Route::middleware('can:can_manage_movements')->group(function () {
    Route::get('/movements', [MovementController::class, 'index'])->name('movements.index');
    Route::get('/movements/create', [MovementController::class, 'create'])->name('movements.create');
    Route::post('/movements', [MovementController::class, 'store'])->name('movements.store');
});
});
Route::get('/movements/export', [MovementController::class, 'export'])->name('movements.export');
require __DIR__.'/auth.php';