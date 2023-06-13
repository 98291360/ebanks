<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientControlller extends Controller
{
    //

    public function addClient(Request $request){

        $client = Client::where('telephone', $request['telephone'])->first();

        if ($client) {
            $response['status'] = 0;
            $response['message'] = 'Phone number already Exists';
            $response['code'] = 409;
         }else{
            $client = Client::create([
                'name' => $request->name,
                'adresse' => $request->adresse,
                'telephone' => $request->telephone,
                'signature' => bcrypt($request->signature)
            ]);

            $response['status'] = 1;
            $response['message'] = 'Client Added Successfully';
            $response['code'] = 200;


         }

         return response()->json($response);
    }

    public function updateClient(Request $request, string $id){

        $client = Client::find($id);

        if (!$client) {
            $response['status'] = 0;
            $response['message'] = 'Data Not Found ';
            $response['code'] = 404;
        }else{

            $client = Client::whereId($id)->update([
                'name' => $request->name,
                'adresse' => $request->adresse,
                'telephone' => $request->telephone,
                'compte_id' => $request->compte_id,
            ]);

            $response['status'] = 1;
            $response['message'] = ' Client Updated Successfully';
            $response['code'] = 200;


        }

         return response()->json($response);
    }

    public function deleteClient(string $id){

        $client = Client::find($id);

        if (!$client) {
            $response['status'] = 0;
            $response['message'] = 'Data Not Found ';
            $response['code'] = 404;
        }else{

            $client->delete($id);

            $response['status'] = 1;
            $response['message'] = ' Client Deleted Successfully';
            $response['code'] = 200;


        }

         return response()->json($response);
    }
    public function getClient(){
        return response([
            'clients' => Client::getClient()
        ], 200);
    }

    public function getClientWithoutCompte(){
       $response['Clients'] =  Client::getClientWithoutCompte();
        return response()->json($response);
    }

    public function getOneClient(string $id){


        $client = Client::where('id', $id)->first();

         $response['status'] = 1;
         $response['code'] = 200;
         $response['data'] = ([
            'id' => $client->id,
            'name' => $client->name,
            'adresse' => $client->adresse,
            'telephone' => $client->telephone
         ]);;




      return response()->json($response);
 }
}
