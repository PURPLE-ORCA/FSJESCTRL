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

    /**
     * Get stock movements for this product.
     */

     public function service()
{
    return $this->belongsTo(Service::class, 'served_to');
}
    public function movements()
    {
        return $this->hasMany(Movement::class);
    }

       /**
     * Get action logs for this product.
     */
    public function actionLogs()
    {
        return $this->hasMany(Action::class);
    }

     /**
     * Get the current service location of the product.
     * assuming the most recent stock movement determines the current location.
     */
    public function currentLocation()
    {
        $latestMovement = $this->Movements()->latest('movement_date')->first();
        
        if ($latestMovement) {
            return Service::find($latestMovement->to_service_id);
        }
        
        // Default to the magazine if no movements exist
        return Service::where('type', 'magazine')->first();
    }
}
