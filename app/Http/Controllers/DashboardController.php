<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Action;
use App\Models\Movement;
use App\Models\HelpRequest;
use App\Models\Product;
use App\Models\Service;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
// app/Http/Controllers/DashboardController.php
public function index()
{
    return Inertia::render('Dashboard', [
        'stats' => [
            'movements' => Movement::count(),
            'products' => Product::count(),
            'services' => Service::count(),
            'users' => User::count(),
        ],
        'movements' => Movement::with([
                'product', 
                'from_service', 
                'to_service',  
                'user'
            ])
            ->latest()
            ->take(5)
            ->get(),
        'movementTrends' => Movement::selectRaw('DATE_FORMAT(movement_date, "%b %Y") as month, COUNT(*) as count')
            ->where('movement_date', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('movement_date')
            ->get()
            ->toArray(),
// app/Http/Controllers/DashboardController.php
'serviceActivity' => Service::withCount([
        'outgoingMovements', 
        'incomingMovements'
    ])
    ->orderBy(
        DB::raw('outgoing_movements_count + incoming_movements_count'), 
        'desc'
    )
    ->take(5)
    ->get()
    ->map(function ($service) {
        return [
            'id' => $service->id,
            'name' => $service->name,
            'movements_count' => $service->outgoing_movements_count + $service->incoming_movements_count
        ];
    }),
        'helpRequests' => HelpRequest::select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->get()
            ->keyBy('status')
            ->toArray(),
            // DashboardController.php
'topProducts' => Product::withCount('movements')
    ->orderBy('movements_count', 'desc')
    ->take(5)
    ->get(['id', 'name', 'movements_count'])
    ->toArray(),
    ]);
}

    // public function movementsAnalysis(Request $request)
    // {
    //     $dateRange = $this->getDateRange($request);
        
    //     $data = Cache::remember("movements_analysis_{$dateRange['from']}_{$dateRange['to']}", 3600, function () use ($dateRange) {
    //         return Movement::select('from_service_id', 'to_service_id', DB::raw('COUNT(*) as total'))
    //             ->whereBetween('movement_date', [$dateRange['from'], $dateRange['to']])
    //             ->groupBy('from_service_id', 'to_service_id')
    //             ->orderByDesc('total')
    //             ->get();
    //     });

    //     return response()->json($data);
    // }

    // public function mostActiveUsers(Request $request)
    // {
    //     $dateRange = $this->getDateRange($request);

    //     $data = Cache::remember("most_active_users_{$dateRange['from']}_{$dateRange['to']}", 3600, function () use ($dateRange) {
    //         return Action::select('user_id', DB::raw('COUNT(*) as total'))
    //             ->whereBetween('created_at', [$dateRange['from'], $dateRange['to']])
    //             ->groupBy('user_id')
    //             ->orderByDesc('total')
    //             ->get();
    //     });

    //     return response()->json($data);
    // }

    // public function helpRequestsInsights()
    // {
    //     $data = Cache::remember('help_requests_insights', 3600, function () {
    //         return HelpRequest::select('status', DB::raw('COUNT(*) as total'))
    //             ->groupBy('status')
    //             ->get();
    //     });

    //     return response()->json($data);
    // }

    // private function getDateRange(Request $request)
    // {
    //     $from = Carbon::parse($request->input('from', Carbon::now()->subDays(7)));
    //     $to = Carbon::parse($request->input('to', Carbon::now()));

    //     return ['from' => $from, 'to' => $to];
    // }
}
