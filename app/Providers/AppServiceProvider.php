<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

         // Define Gates for individual roles
        Gate::define('is_general_manager', function ($user) {
            return $user->hasRole('general_manager');
        });

        Gate::define('is_magazine_manager', function ($user) {
            return $user->hasRole('magazine_manager');
        });

        Gate::define('is_magazine_employee', function ($user) {
            return $user->hasRole('magazine_employee');
        });

        Gate::define('is_it_manager', function ($user) {
            return $user->hasRole('it_manager');
        });

        Gate::define('is_it_employee', function ($user) {
            return $user->hasRole('it_employee');
        });

Gate::define('can_manage_products', function ($user) {
    return in_array($user->role?->name, ['general_manager', 'magazine_manager', 'magazine_employee']);
});
Gate::define('can_manage_users', function ($user) {
    return in_array($user->role?->name, ['general_manager']);
});
        // Define Gates for role combinations (e.g. user with multiple roles)
        // Gate::define('is_magazine_staff', function ($user) {
        //     return $user->hasAnyRoles(['magazine_manager', 'magazine_employee']);
        // });

        // Gate::define('is_it_staff', function ($user) {
        //     return $user->hasAnyRoles(['it_manager', 'it_employee']);
        // });

        // Gate::define('can_manage_products', function ($user) {
        //     return $user->hasAnyRoles(['general_manager', 'magazine_manager', 'magazine_employee']);
        // });

        // Gate::define('can_view_analytics', function ($user) {
        //     return $user->hasRole('general_manager');
        // });
    }
}
