<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Http\Requests\StoreActionRequest;
use App\Http\Requests\UpdateActionRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ActionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
 // List actions with optional search and sorting
    public function index(Request $request)
    {
        $query = Action::query()->with(['product', 'user']);

        // Handle search across multiple fields
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('action', 'like', '%' . $search . '%')
                  ->orWhere('details', 'like', '%' . $search . '%')
                  ->orWhereHas('product', function($subQuery) use ($search) {
                      $subQuery->where('name', 'like', '%' . $search . '%');
                  });
            });
        }

        // Handle sorting with better defaults
        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');
        
        // Handle different sort options
        switch ($sortBy) {
            case 'action':
                $query->orderBy('action', $sortOrder);
                break;
            case 'updated_at':
                $query->orderBy('updated_at', $sortOrder);
                break;
            default:
                $query->orderBy('created_at', $sortOrder);
                break;
        }

        // Get paginated results
        $actions = $query->paginate(10)->appends($request->query());

        return Inertia::render('Actions/ActionList', [
            'actions' => $actions,
            'filters' => $request->only([
                'search', 
                'sort_by', 
                'sort_order'
            ])
        ]);
    }


public function create()
{
    // Fetch products with 'id', 'name', and 'serial_number'
    $products = Product::select('id', 'name', 'serial_number') // Add 'serial_number'
        ->get()
        ->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'serial_number' => $product->serial_number, // Ensure this is included
            ];
        })
        ->toArray();

    return Inertia::render('Actions/ActionCreate', [
        'products' => $products,
    ]);
}

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'action'     => 'required|string|max:100',
            'details'    => 'nullable|string',
        ]);

        Action::create([
            'product_id' => $request->input('product_id'),
            'user_id'    => $request->user()->id,
            'action'     => $request->input('action'),
            'details'    => $request->input('details'),
        ]);

        return Redirect::route('actions.index')
            ->with('success', 'Action logged successfully.');
    }

    public function show(Action $action)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Action $action)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateActionRequest $request, Action $action)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Action $action)
    {
        //
    }
}
