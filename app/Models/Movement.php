<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movement extends Model
{
    /** @use HasFactory<\Database\Factories\MovementFactory> */
    use HasFactory;

     protected $fillable = [
        'product_id',
        'from_service_id',
        'to_service_id',
        'movement_date',
        'user_id',
        'note',
    ];

     /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'movement_date' => 'datetime',
    ];

    /**
     * Get the product associated with the stock movement.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the source service of the movement.
     */
    public function fromService()
    {
        return $this->belongsTo(Service::class, 'from_service_id');
    }

    /**
     * Get the destination service of the movement.
     */
    public function toService()
    {
        return $this->belongsTo(Service::class, 'to_service_id');
    }

    public function from_service()
    {
        return $this->belongsTo(Service::class, 'from_service_id');
    }

    // Define to_service relationship
    public function to_service()
    {
        return $this->belongsTo(Service::class, 'to_service_id');
    }
    /**
     * Get the user who initiated the movement.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Determine if this is a movement from the magazine.
     */
    public function isFromMagazine(): bool
    {
        return $this->fromService->type === 'magazine';
    }

    /**
     * Determine if this is a movement to the magazine.
     */
    public function isToMagazine(): bool
    {
        return $this->toService->type === 'magazine';
    }
}
