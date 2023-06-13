<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Operation extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'montant',
        'compte_id',
        'signature'
    ];


    public static function getOperation(){
        $operationList = DB::table('operations')
        ->join('comptes', 'comptes.id', '=', 'operations.compte_id')
        ->select( 'operations.id','operations.type', 'operations.montant', 'operations.date_operation',  'comptes.num_compte')
        ->orderBy('operations.created_at', 'DESC')->get();

        return $operationList;
}
public static function getOperationCahrt(){
    $operationList = DB::table('operations')
    ->select( 'operations.date_operation')
    ->where('operations.date_operation', '>=', DB::raw('curdate() - 5'))
    ->groupBy('operations.date_operation')
    ->orderBy('operations.created_at', 'DESC')->get();

    return $operationList;
}

public static function countOperation(){
    $operationList = DB::table('operations')
    ->select( DB::raw('count(operations.type) as nombre'))
    ->where('operations.date_operation', '>=', DB::raw('curdate() - 5'))
    ->groupBy('operations.date_operation')->orderBy('operations.created_at', 'DESC')->get();

    return $operationList;
}
public static function countVersementOperation(){
    $operationList = DB::table('operations')->select( 'operations.type')
    ->distinct()->get();

    return $operationList;
}
public static function countRetraitOperation(){
    $operationList = DB::table('operations')
    ->selectRaw( DB::raw('count(operations.type) as versements'))
    ->distinct()
    ->where('operations.date_operation', '>=', DB::raw('curdate()'))
    ->groupBy('operations.type')->get() ->toArray();;

    return $operationList;
}
public static function countDateOperation(){
    $operationList = DB::table('operations')
    ->select( DB::raw('operations.date_operation'))
    ->where('operations.date_operation', '>=', DB::raw('curdate()'))
    ->groupBy('operations.date_operation')->get();

    return $operationList;
}



public static function getHistorique($num_compte){
    $operationList = DB::table('operations')
    ->join('comptes', 'comptes.id', '=', 'operations.compte_id')
    ->select( 'operations.id','operations.type', 'operations.montant', 'operations.date_operation',  'comptes.num_compte')
    ->where('comptes.num_compte' ,'=', $num_compte)
    ->orderBy('operations.created_at', 'DESC')->get();

    return $operationList;
}
}
