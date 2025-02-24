<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
    /** @use HasFactory<\Database\Factories\ActionFactory> */
    use HasFactory;

    protected $fillable = [
        'product_id',
        'user_id',
        'action',
        'details',
    ];

    /**
     * Get the product associated with the action log.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the user who performed the action.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
