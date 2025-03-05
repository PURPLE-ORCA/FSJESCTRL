<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query()->with('service'); // Eager-load service

        // Search
        $query->when($request->search, function($q, $search) {
            return $q->where('name', 'like', "%{$search}%")
                    ->orWhere('supplier', 'like', "%{$search}%"); // Match column case
        });

        // Sorting
        $query->orderBy(
            $request->sort_by ?? 'name',
            $request->sort_order ?? 'asc'
        );

        $products = $query->paginate(10);

        return Inertia::render('Products/ProductList', [
            'products' => $products,
            'filters' => $request->only(['search', 'sort_by', 'sort_order']),
        ]);
    }

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
            'supplier' => 'required|string|max:150',
            'quantity' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'served_to' => 'nullable|exists:services,id', // Allow null
        ]);

        Product::create($request->all());

        return Redirect::route('products.index')->with('success', 'Product created successfully!');
    }
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $services = Service::all();
        return Inertia::render('Products/ProductEdit', [
            'product' => $product,
            'services' => $services,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:150',
            'serial_number' => 'required|string|unique:products,serial_number,'.$product->id.'|max:100',
            'supplier' => 'required|string|max:150',
            'quantity' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0',
            'served_to' => 'nullable|exists:services,id', // Ensure nullable is allowed
        ]);

        $product->update($request->all());

        return Redirect::route('products.index')->with('success', 'Product updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return Redirect::route('products.index')->with('success', 'Product deleted successfully!');
    }
}
