<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

     protected $fillable = [
        'name',
        'serial_number',
        'supplier',
        'price',
    ];

    public function movements()
    {
        return $this->hasMany(Movement::class);
    }

    public function actionLogs()
    {
        return $this->hasMany(Action::class);
    }

     /**
     * Get the current service location of the product.
     * the most recent stock movement determines the current location.
     */
    // public function currentLocation()
    // {
    //     $latestMovement = $this->Movements()->latest('movement_date')->first();
        
    //     if ($latestMovement) {
    //         return Service::find($latestMovement->to_service_id);
    //     }
        
    //     // Default to the magazine if no movements exist
    //     return Service::where('type', 'magazine')->first();
    // }

    protected $appends = ['current_location'];

public function getCurrentLocationAttribute()
{
    $latestMovement = $this->movements()->latest('movement_date')->first();

    if ($latestMovement) {
        $service = Service::find($latestMovement->to_service_id);
        return $service ? ['id' => $service->id, 'name' => $service->name] : null;
    }

    // Default to the magazine service if no movements exist
    $defaultService = Service::where('type', 'magazine')->first();
    return $defaultService ? ['id' => $defaultService->id, 'name' => $defaultService->name] : null;
}

}
