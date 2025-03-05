<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Service::withCount('users'); // Add this line

        // Search by name
        if ($request->has('search')) {
            $query->where('name', 'like', "%{$request->input('search')}%");
        }

        // Sorting
        $query->orderBy($request->sort_by ?? 'name', $request->sort_order ?? 'asc');

        $services = $query->paginate(10);

        return Inertia::render('Services/ServiceList', [
            'services' => $services,
            'filters' => $request->only(['search', 'sort_by', 'sort_order']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Services/ServiceCreate');
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:services',
            'description' => 'required|string|max:255',
            'type' => 'required|string|in:magazine,service',
        ]);

        Service::create([
            'name' => $request->name,
            'description' => $request->description,
            'type' => $request->type,
        ]);

        return Redirect::route('services.index')->with('success', 'Service created successfully!');
    }

    public function edit(Service $service)
    {
        return Inertia::render('Services/ServiceEdit', [
            'service' => $service,
        ]);
    }

    public function update(Request $request, Service $service)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:services,name,' . $service->id,
            'description' => 'nullable|string',
            'type' => 'required|string|in:magazine,service',
        ]);

        $service->update([
            'name' => $request->name,
            'description' => $request->description,
            'type' => $request->type,
        ]);

        return Redirect::route('services.index')->with('success', 'Service updated successfully!');
    }
    public function destroy(Service $service)
    {
        $service->delete();
        return Redirect::route('services.index')->with('success', 'Service deleted successfully!');
    }
}