<?php

namespace App\Http\Controllers;

use App\Models\Movement;
use App\Http\Requests\StoreMovementRequest;
use App\Http\Requests\UpdateMovementRequest;
use App\Models\Product;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MovementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
public function index(Request $request)
{
    $query = Movement::query()
        ->with(['product', 'fromService', 'toService', 'user'])
        ->orderBy('movement_date', 'desc');

    if ($request->has('search')) {
        $search = $request->input('search');
        $query->whereHas('product', function($q) use ($search) {
            $q->where('name', 'like', "%{$search}%");
        });
    }

    $movements = $query->paginate(10);

    return Inertia::render('Movements/MovementList', [
        'movements' => $movements,
        'filters' => $request->only(['search']),
    ]);
}

public function store(Request $request)
{
    $request->validate([
        'product_id' => 'required|exists:products,id',
        'from_service_id' => 'required|exists:services,id',
        'to_service_id' => 'required|exists:services,id|different:from_service_id',
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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
