<?php

namespace App\Http\Controllers;

use App\Models\Movement;
use App\Http\Requests\UpdateMovementRequest;
use App\Models\Product;
use App\Models\Service;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule; // Add this import
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MovementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Movement::query()
            ->with(['product', 'fromService', 'toService', 'user']);

        // Handle search
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->whereHas('product', function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        // Handle sorting
        $sortBy = $request->input('sort_by', 'movement_date');
        $sortOrder = $request->input('sort_order', 'desc');
        
        // Handle different sort options
        switch ($sortBy) {
            case 'product_name':
                $query->join('products', 'movements.product_id', '=', 'products.id')
                      ->orderBy('products.name', $sortOrder)
                      ->select('movements.*');
                break;
            case 'quantity':
                $query->orderBy('quantity', $sortOrder);
                break;
            default:
                $query->orderBy('movement_date', $sortOrder);
                break;
        }

        // Handle filtering by services
        if ($request->filled('from_service_id') && $request->input('from_service_id') !== 'all') {
            $query->where('from_service_id', $request->input('from_service_id'));
        }
        
        if ($request->filled('to_service_id') && $request->input('to_service_id') !== 'all') {
            $query->where('to_service_id', $request->input('to_service_id'));
        }

        // Get all services for the filter dropdowns
        $services = Service::select('id', 'name')->orderBy('name')->get();

        $movements = $query->paginate(20);

        return Inertia::render('Movements/MovementList', [
            'movements' => $movements,
            'filters' => $request->only([
                'search', 
                'sort_by', 
                'sort_order', 
                'from_service_id', 
                'to_service_id'
            ]),
            'services' => $services,
        ]);
    }
    public function create()
    {
        $user = auth::user();

    // Ensure user has a service assigned
        abort_if(!$user->service_id, 403, 'You need to be assigned to a service');

            return Inertia::render('Movements/MovementCreate', [
            'products' => Product::where('served_to', $user->service_id)->get(),
                'services' => Service::all(),
            'user_service_id' => $user->service_id, 
            ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'from_service_id' => [
                'required',
                'integer',
                'exists:services,id',
                Rule::in([$request->user()->service_id])
            ],
            'to_service_id' => [
                'required',
                'integer',
                'exists:services,id',
                'different:from_service_id'
            ],
            'quantity' => 'required|integer|min:1',
            'note' => 'nullable|string',
        ]);
        $product = Product::findOrFail($request->product_id);

        // Ensure the product is currently in the from_service
        if ($product->served_to !== $request->from_service_id) {
            return Redirect::back()->withErrors(['from_service_id' => 'Product is not assigned to the selected source service']);
        }

        // Update product's service
        $product->update(['served_to' => $request->to_service_id]);

        // Create movement record
        Movement::create([
            'product_id' => $request->product_id,
            'from_service_id' => $request->from_service_id,
            'to_service_id' => $request->to_service_id,
            'quantity' => $request->quantity,
            'user_id' => Auth::id(),
            'note' => $request->note,
        ]);

        return Redirect::route('movements.index')->with('success', 'Movement recorded successfully!');
    }
    public function show(Movement $movement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Movement $movement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMovementRequest $request, Movement $movement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movement $movement)
    {
        //
    }
}
