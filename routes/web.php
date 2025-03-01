<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;

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
});
require __DIR__.'/auth.php';