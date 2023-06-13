<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Compte;
use App\Models\Operation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class OperationControlller extends Controller
{
    public function addOperation(Request $request){

        $compte = Compte::where('num_compte', $request['num_compte'])->first();
        if (!$compte) {
            $response['status'] = 0;
            $response['message'] = 'This Number Account  Not Found!!!';
            $response['code'] = 404;
         }else if($compte->etat == 0){
            $response['status'] = 0;
            $response['message'] = 'This Account  is Disabled!!!';
            $response['code'] = 404;
         } else if ($request->montant < 0) {
            $response['status'] = 0;
            $response['message'] = 'Enter only positive number!!!';
            $response['code'] = 404;



            }else{
                $client = Client::where('id',  $compte->client_id)->first();
                if(!password_verify($request->signature, $client->signature )){
                    $response['status'] = 0;
                    $response['message'] = 'Signature Incorrect';
                    $response['code'] = 404;

            } else{

                if(($request->type == 'Retrait')){

                    if ($compte->solde < $request->montant) {
                    $response['status'] = 0;
                    $response['message'] = 'Your Account Balance Is Enough!!!';
                    $response['code'] = 404;

                    return response()->json($response);


                }else{
                    $compte->solde = $compte->solde - $request->montant;
                }


            }else{
                    $compte->solde = $compte->solde + $request->montant;
                }
                Compte::whereId($compte->id)->update([
                    'solde' => $compte->solde,
                ]);

                $operation = Operation::create([
                    'type'=>$request->type,
                    'montant'=>$request->montant,
                    'compte_id'=> $compte->id,
                    'signature'=>bcrypt($request->signature)
                ]);

                     if($operation) {


                    $response['status'] = 1;
                    $response['message'] = ' Operation  Added Successfully';
                    $response['code'] = 200;
                    return response()->json($response);



                     }

                    }


            }
            return response()->json($response);

        }


    public function getOperation(){

        $response['data'] =   Operation::countOperation();
        $response['data1'] =  Operation::countRetraitOperation();
        $response['data2'] =  Operation::countVersementOperation();
        $response['DateOperation'] =   Operation::countDateOperation();
        $response['chartOperations']= Operation::getOperationCahrt();
        $response['operations'] =  Operation::getOperation();
        return response()->json($response);
    }

    public function consulterOperation(Request $request){

        $compte = Compte::where('num_compte', $request['num_compte'])->first();


           if (!$compte) {
            $response['status'] = 0;
            $response['message'] = 'Account Not Found';
            $response['code'] = 404;

           }else if($compte->etat == 0){
            $response['status'] = 0;
            $response['message'] = 'This Account  is Disabled!!!';
            $response['code'] = 404;
           } else{
            $client = Client::where('id', $compte->client_id)->first();
            if (!password_verify($request->signature, $client->signature )) {
                $response['status'] = 0;
                $response['message'] = 'Signature Incorrect';
                $response['code'] = 404;


               }else{
                $response['status'] = 1;
                $response['message'] = 'Connection  Succesfully';
                $response['code'] = 200;


                $response['data'] = Operation::getHistorique($compte->num_compte);



               }
           }


         return response()->json($response);
    }
}

