<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
                    ->orWhere('supplier', 'like', "%{$search}%")
                    ->orWhere('id', 'like', "%{$search}%")
                    ->orWhere('price', 'like', "%{$search}%")
                    ->orWhere('serial_number', 'like', "%{$search}%"); // Match column case
        });

        // Sorting
        $query->orderBy(
            $request->sort_by ?? 'name',
            $request->sort_order ?? 'asc'
        );

        $products = $query->paginate(20);

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
            'serial_number' => 'required|string|max:100',
            'supplier' => 'required|string|max:150',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'served_to' => 'nullable|exists:services,id', // Allow null
        ]);

         $quantity = $request->quantity;
        $initialSerial = $request->serial_number;

        if (!preg_match('/^(.*?)(\d+)$/', $initialSerial, $matches)) {
            return Redirect::back()->withErrors([
                'serial_number' => 'Invalid serial number format. Please use a format like MONI-001.',
            ]);
        }

        $prefix = $matches[1];              // e.g., "MONI-"
                $number = $matches[2];              // e.g., "001"
                $numberLength = strlen($number);    // e.g., 3 digits
                $startingNumber = intval($number);

                try {
                    DB::transaction(function() use ($request, $quantity, $prefix, $startingNumber, $numberLength) {
                        for ($i = 0; $i < $quantity; $i++) {
                            $currentNumber = $startingNumber + $i;
                            $newSerial = $prefix . str_pad($currentNumber, $numberLength, '0', STR_PAD_LEFT);

                            // Ensure uniqueness of the generated serial.
                            if (Product::where('serial_number', $newSerial)->exists()) {
                                throw new \Exception("Serial number {$newSerial} already exists.");
                            }

                            Product::create([
                                'name' => $request->name,
                                'serial_number' => $newSerial,
                                'supplier' => $request->supplier,
                                'price' => $request->price,
                                'served_to' => $request->served_to,
                            ]);
                        }
                    });
                } catch (\Exception $e) {
                    return Redirect::back()->withErrors(['serial_number' => $e->getMessage()]);
                }
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
