<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Http\Requests\StoreActionRequest;
use App\Http\Requests\UpdateActionRequest;
use Illuminate\Http\Request;

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


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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

        return redirect()->back()->with('success', 'Action created successfully.');
    }
    /**
     * Display the specified resource.
     */
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
