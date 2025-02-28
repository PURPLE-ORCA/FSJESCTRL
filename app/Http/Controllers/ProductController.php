<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
public function index(Request $request)
{
    // Pagination, Search, and Sorting
    $query = Product::query()->with('service'); // Eager-load the service

    // Search by name or supplier
if ($request->has('search')) {
    $search = $request->input('search');
    $query->where(function ($q) use ($search) {
        $q->where('name', 'like', "%{$search}%")
          ->orWhere('supplier', 'like', "%{$search}%")
          ->orWhereHas('service', function ($q) use ($search) {
              $q->where('name', 'like', "%{$search}%");
          });
    });
}

    // Sorting
    if ($request->has('sort_by') && $request->has('sort_order')) {
        $query->orderBy($request->input('sort_by'), $request->input('sort_order'));
    }

    // Paginate results
    $products = $query->paginate(20);

    // Debugging: Log the products data
    Log::info('Products Data:', ['products' => $products]);

    return Inertia::render('Products/ProductList', [
        'products' => $products,
        'filters' => $request->only(['search', 'sort_by', 'sort_order']),
    ]);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        //
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
