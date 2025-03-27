<?php

use App\Http\Controllers\ActionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HelpRequestController;
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

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/movements-analysis', [DashboardController::class, 'movementsAnalysis'])->name('dashboard.movements-analysis');
    Route::get('/dashboard/most-active-users', [DashboardController::class, 'mostActiveUsers'])->name('dashboard.most-active-users');
    Route::get('/dashboard/help-requests-insights', [DashboardController::class, 'helpRequestsInsights'])->name('dashboard.help-requests-insights');

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
    Route::middleware('can:can_view_actions')->group(function () {
        Route::get('/actions', [ActionController::class, 'index'])->name('actions.index');
        Route::get('/actions/create', [ActionController::class, 'create'])->name('actions.create');
        Route::post('/actions', [ActionController::class, 'store'])->name('actions.store');
    });

    Route::get('/help-requests', [HelpRequestController::class, 'index'])->name('help-requests.index');
    Route::post('/help-requests', [HelpRequestController::class, 'store'])->name('help-requests.store');
    Route::put('/help-requests/{helpRequest}/status', [HelpRequestController::class, 'updateStatus'])->name('help-requests.update-status');
    Route::get('/help-requests/pending-count', [HelpRequestController::class, 'getPendingCount'])->name('help-requests.pending-count');
    Route::post('/help-requests/mark-as-read', [HelpRequestController::class, 'markAllAsRead'])->name('help-requests.mark-as-read');
    Route::get('/help-requests/create', [HelpRequestController::class, 'create'])->name('help-requests.create');
Route::get('help-requests/{helpRequest}', [HelpRequestController::class, 'show'])
    ->name('help-requests.show');
});

Route::get('/movements/export', [MovementController::class, 'export'])->name('movements.export');
require __DIR__.'/auth.php';