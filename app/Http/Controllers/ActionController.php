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

        if ($search = $request->input('search')) {
            $query->where('action', 'like', '%' . $search . '%')
                  ->orWhere('details', 'like', '%' . $search . '%');
        }

        if ($request->has('sort_by') && $request->has('sort_order')) {
            $query->orderBy($request->input('sort_by'), $request->input('sort_order'));
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $actions = $query->paginate(10)->appends($request->query());

        return inertia('Actions/ActionList', [
            'actions' => $actions,
            'filters' => $request->all(['search', 'sort_by', 'sort_order']),
            // 'auth' => $request->user(),
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
