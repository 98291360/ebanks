<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'adresse',
        'telephone',
        'compte_id',
        'signature'
    ];



    public static function getClient(){
            $clientList = DB::table('clients')->join('comptes', 'comptes.client_id', '=', 'clients.id')
            ->select('clients.id', 'clients.name', 'clients.adresse', 'clients.telephone', 'comptes.num_compte')->orderBy('clients.created_at', 'DESC')->get();

            return $clientList;
    }
    public static function getClientWithoutCompte(){
        $clientList = DB::table('clients')->select('clients.id', 'clients.name', 'clients.adresse', 'clients.telephone')->orderBy('clients.created_at', 'DESC')->get();

        return $clientList;
}



}
