<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    /** @use HasFactory<\Database\Factories\ServiceFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function outgoingMovements()
    {
        return $this->hasMany(Movement::class, 'from_service_id');
    }

    public function incomingMovements()
    {
        return $this->hasMany(Movement::class, 'to_service_id');
    }
    
    public function movements()
    {
        return $this->outgoingMovements()->union($this->incomingMovements());
    }

    public function isMagazine(): bool
    {
        return $this->type === 'magazine';
    }
}
