<?php
namespace App\Http\Controllers;

use App\Models\HelpRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class HelpRequestController extends Controller
{
// app/Http/Controllers/HelpRequestController.php
    public function index(Request $request)
    {
        // Default to showing all statuses if no filter is provided
        $statusFilter = $request->query('status', 'all');
        
        $query = HelpRequest::with(['user', 'product'])->latest();
        $query->when($request->search, function($q, $search){
            return $q->where('product', function($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
        });
                
        // Apply filter if a specific status is requested
        if ($statusFilter !== 'all') {
            $query->where('status', $statusFilter);
        }
        
        $helpRequests = $query->get();
        $pendingCount = HelpRequest::where('status', 'pending')->count();
        
        return Inertia::render('HelpRequests/Index', [
            'helpRequests' => $helpRequests,
            'pendingCount' => $pendingCount,
            'currentFilter' => $statusFilter,
        ]);
    }

    public function show(HelpRequest $helpRequest)
    {
        // Eager load the help request with its related product, user, and action logs
        $helpRequest->load([
            'user', 
            'product', 
            'product.actionLogs.user'  // Load the user info for each action
        ]);
        
        return Inertia::render('HelpRequests/Show', [
            'helpRequest' => $helpRequest,
        ]);
    }
    public function create()
    {
        $products = Product::all();
        
        return Inertia::render('HelpRequests/Create', [
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'description' => 'required|string',
        ]);
        
        HelpRequest::create([
            'user_id' => Auth::id(),
            'product_id' => $validated['product_id'],
            'description' => $validated['description'],
            'status' => 'pending',
        ]);
        
        return Redirect::route('dashboard')->with('success', 'Help request submitted successfully.');
    }
    
    public function updateStatus(HelpRequest $helpRequest, Request $request)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,in_progress,resolved,closed',
        ]);
        
        $oldStatus = $helpRequest->status;
        $newStatus = $validated['status'];
        
        $helpRequest->update(['status' => $newStatus]);
        
        return redirect()->back()->with('success', 'Status updated successfully.');
    }
    
    public function getPendingCount()
    {
        return response()->json([
            'count' => HelpRequest::where('status', 'pending')->count()
        ]);
    }
    
}