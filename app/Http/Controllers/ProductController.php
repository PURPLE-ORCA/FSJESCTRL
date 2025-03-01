<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
public function index(Request $request)
{
    // Pagination, Search, and Sorting
    $products = Product::with('service')
        ->when($request->search, function($query, $search) {
            return $query->where('name', 'like', "%{$search}%")
                         ->orWhere('supplier', 'like', "%{$search}%");
        })
        ->orderBy($request->sort_by ?? 'name', $request->sort_order ?? 'asc')
        ->paginate(10);

    return Inertia::render('Products/ProductList', [
        'products' => $products,
        'filters' => $request->only(['search', 'sort_by', 'sort_order']),
    ]);
}

// In ProductController.php
public function create()
{
    $services = Service::all();
    return Inertia::render('Products/ProductCreate', [
        'services' => $services,
    ]);
}

public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:150',
        'serial_number' => 'required|string|unique:products|max:100',
        'supplier' => 'required|string|max:150', // Ensure supplier is required
        'quantity' => 'required|integer|min:0',
        'price' => 'required|numeric|min:0',
        'served_to' => 'nullable|exists:services,id',    
    ]);

    Product::create($request->all());

    return Redirect::route('products.index')->with('success', 'Product created successfully!');
}

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
