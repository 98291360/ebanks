<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientControlller;
use App\Http\Controllers\CompteControlller;
use App\Http\Controllers\OperationControlller;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register',[UserController::class, 'register']);
Route::post('/login',[UserController::class, 'login']);
Route::post('/forgotPassword',[UserController::class, 'forgotPassword']);
Route::put('/resetPassword/{id}',[UserController::class, 'resetPassword']);
Route::get('/getUser/{id}',[UserController::class, 'getUser']);

//Client routes
Route::post('/addClient',[ClientControlller::class, 'addClient']);
Route::post('/updateSignature',[CompteControlller::class, 'updateSignature']);
Route::get('/getClient',[ClientControlller::class, 'getClient']);
Route::get('/getOneClient/{id}',[ClientControlller::class, 'getOneClient']);
Route::get('/getClientWithoutCompte',[ClientControlller::class, 'getClientWithoutCompte']);
Route::put('/updateClient/{id}',[ClientControlller::class, 'updateClient']);
Route::delete('/deleteClient/{id}',[ClientControlller::class, 'deleteClient']);


//Compte routes
Route::post('/addCompte',[CompteControlller::class, 'addCompte']);
Route::put('/updateCompte/{id}',[CompteControlller::class, 'updateCompte']);
Route::delete('/deleteCompte/{id}',[CompteControlller::class, 'deleteCompte']);
Route::post('/consulterCompte',[CompteControlller::class, 'consulterCompte']);
Route::get('/getCompte',[CompteControlller::class, 'getCompte']);
Route::get('/getOneCompte/{id}',[CompteControlller::class, 'getOneCompte']);

//Operation routes
Route::post('/addOperation',[OperationControlller::class, 'addOperation']);
Route::get('/getOperation',[OperationControlller::class, 'getOperation']);
Route::post('/consulterOperation',[OperationControlller::class, 'consulterOperation']);
Route::get('/sendSmsNotificaition',[OperationControlller::class, 'sendSmsNotificaition']);


