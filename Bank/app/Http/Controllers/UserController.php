<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    //

    public function register(Request $requset){

        $user = User::where('email', $requset['email'])->first();

        if ($user) {
            $response['status'] = 0;
            $response['message'] = 'Email already Exists';
            $response['code'] = 409;
         }else{
            $user = User::create([
                'name' => $requset->name,
                'email' => $requset->email,
                'password' => bcrypt($requset->password)
            ]);

            $response['status'] = 1;
            $response['message'] = 'User Register Successfully';
            $response['code'] = 200;


         }

         return response()->json($response);

    }

    public function login(Request $request){
        $credentials = $request->only('email', 'password');
        try {
            if (!JWTAuth::attempt($credentials)) {
            $response['status'] = 0;
            $response['code'] = 401;
            $response['message'] = 'Email or Password  incorrect';
            return response()->json($response);
            }
        } catch (JWTException $e) {
            $response['data'] = null;
            $response['code'] = 500;
            $response['message'] = 'Could Not Create Token';
            return response()->json($response);
        }

        $user = auth()->user();

        $data['token'] = auth()->claims([
            'user_id' => $user->id,
            'email' => $user->email,
            'name' =>$user->name

        ])->attempt($credentials);
        $response['data'] = $data;
        $response['status'] = 1;
        $response['code'] = 200;
        $response['message'] = 'Login  Successfully';

        return response()->json($response);
    }


    public function forgotPassword(Request $request){

        $user = User::where('email', $request['email'])->first();

        if (!$user) {
            $response['status'] = 0;
            $response['message'] = 'Email Incorrect';
            $response['code'] = 404;
         }else{

            $response['status'] = 1;
            $response['message'] = 'Email  Is Correct';
            $response['code'] = 200;
            $response['data'] = $user;


         }

         return response()->json($response);
    }

    public function resetPassword(Request $request, string $id){


            User::whereId($id)->update([
                'password' => bcrypt($request->password)
            ]);

            $response['status'] = 1;
            $response['message'] = 'Password reseted successfully';
            $response['code'] = 200;


























         return response()->json($response);
    }

    public function getUser(string $id){


       $user = User::where('id', $id)->get();

        $response['status'] = 1;
        $response['code'] = 200;
        $response['data'] = $user;




     return response()->json($response);
}


}
