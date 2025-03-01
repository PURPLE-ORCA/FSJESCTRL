<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\Service;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{

    public function index(Request $request)
    {
        $query = User::query()->with(['role', 'service']);

        // Search by name or email
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
        }

        // Sorting
        $query->orderBy(
            $request->sort_by ?? 'name',
            $request->sort_order ?? 'asc'
        );

        $users = $query->paginate(10);

        return Inertia::render('Users/UsersList', [
            'users' => $users,
            'roles' => Role::all(), // For role assignment dropdown
            'services' => Service::all(), // For service assignment dropdown
            'filters' => $request->only(['search', 'sort_by', 'sort_order']),
        ]);
    }
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register', [
            'services' => Service::all(), // Pass services to the form
        ]);    
}

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'service_id' => 'required|exists:services,id',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'service_id' => $request->service_id,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }

        public function update(Request $request, User $user)
        {
            $request->validate([
                'role_id' => 'required|exists:roles,id',
                'service_id' => 'nullable|exists:services,id',
            ]);

            $user->update([
                'role_id' => $request->role_id,
                'service_id' => $request->service_id,
            ]);

            return Redirect::back()->with('success', 'User updated successfully!');
        }

        public function destroy(User $user)
        {
            $user->delete();
            return Redirect::back()->with('success', 'User deleted successfully!');
        }
}
