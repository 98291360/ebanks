<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Compte extends Model
{
    use HasFactory;

    protected $fillable = [
        'num_compte',
        'type',
        'solde',
        'client_id',
        'etat'
    ];

    public function operations()
    {
        return $this->hasManyThrough(Operation::class, Compte::class);
    }


    public static function getCompte(){
        $compteList = DB::table('comptes')->join('clients', 'clients.id', '=', 'comptes.client_id')
        ->select( 'comptes.id','comptes.num_compte', 'comptes.type', 'comptes.solde', 'comptes.created_at', 'comptes.etat', 'clients.name')
        ->orderBy('comptes.created_at', 'DESC');

        return $compteList;
}


}
