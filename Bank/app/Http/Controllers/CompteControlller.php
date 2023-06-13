<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Compte;
use Illuminate\Http\Request;

class CompteControlller extends Controller
{
    public function addCompte(Request $request){

        if($request->type == "Epargne"){

            $num_compte = "Ep-".rand(0, 9999);
           }else{
            $num_compte = "Cr-".rand(0, 9999);
           }
           
           $compte = Compte::where('num_compte', $request['num_compte'])->first();
           if ($compte) {
            $response['status'] = 0;
            $response['message'] = 'Compte already Exists';
            $response['code'] = 409;

           }
           $compte = Compte::create([
            'num_compte' => $num_compte,
            'type' => $request->type,
            'solde' => 0,
            'client_id' => $request->client_id
        ]);
        $response['status'] = 1;
        $response['message'] = 'Compte Register Successfully';
        $response['code'] = 200;


         return response()->json($response);
    }

    public function updateCompte(Request $request, string $id){

        $client = Compte::find($id);

        if (!$client) {
            $response['status'] = 0;
            $response['message'] = 'Data Not Found ';
            $response['code'] = 404;
        }else{

            $client = Compte::whereId($id)->update([
                'type' => $request->type,
                'etat' => $request->etat,
                'num_compte' => $request->num_compte,
                'client_id' => $request->client_id,

            ]);

            $response['status'] = 1;
            $response['message'] = ' Compte Updated Successfully';
            $response['code'] = 200;


        }

         return response()->json($response);
    }

    public function deleteCompte(string $id){

        $compte = Compte::find($id);

        if (!$compte) {
            $response['status'] = 0;
            $response['message'] = 'Data Not Found ';
            $response['code'] = 404;
        }else{

            $compte->delete($id);

            $response['status'] = 1;
            $response['message'] = 'Compte Deleted Successfully';
            $response['code'] = 200;


        }

         return response()->json($response);
    }

    public function consulterCompte(Request $request){

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
                $response['data'] = ([
                    'num_compte' => $compte->num_compte,
                    'solde' => $compte->solde,
                    'type' => $compte->type,
                    'created_at' => $compte->created_at,
                    'etat' => $compte->etat,
                    'signature' => $client->signature,
                    'id' => $compte->id
                ]) ;

                return response()->json($response);
               }
           }


         return response()->json($response);
    }

    public function updateSignature(Request $request){

        $compte = Compte::where('num_compte', $request['num_compte'])->first();


           if (!$compte) {
            $response['status'] = 0;
            $response['message'] = 'Account Not Found';
            $response['code'] = 404;

           } else{

            Client::whereId($compte->client_id)->update([

                'signature' => bcrypt($request->signature),

            ]);

            $response['status'] = 1;
            $response['message'] = ' Signature Updated Successfully';
            $response['code'] = 200;


           }


         return response()->json($response);
    }

    public function getCompte(){
        return response([
            'comptes' => Compte::getCompte()->get(),

        ], 200);
    }


    public function getOneCompte(string $id){


        $compte = Compte::where('id', $id)->first();

         $response['status'] = 1;
         $response['code'] = 200;
         $response['data'] = ([
            'id' => $compte->id,
            'num_compte' => $compte->num_compte,
            'type' => $compte->type,
            'etat' => $compte->etat,
            'client_id' =>$compte->client_id
         ]);;




      return response()->json($response);
 }
}
