<?php

namespace App\Http\Controllers;

use App\Models\User;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\UploadedFile;
class UserController extends Controller
{


    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::latest()->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $data)
    {
        $data->validate([
            'name' => ['required', 'string', 'max:50'],
            'email' => ['required', 'string', 'email', 'max:50', 'unique:users'],
            'bio' => ['required', 'string', 'max:255'],
            'order' => 'required',
            'password' => ['required', 'string', 'min:4', ],
        ]);
        
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'bio' => $data['bio'],
            'order' => $data['order'],
            'password' => Hash::make($data['password']),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
  
    public function updateProfile(Request $request)
    {
        $id = auth('api')->user()->id;
        $user = User::findOrFail($id);
        $this->validate($request, [
            'name' => 'required | string | max:50',
            'email' => 'required | string | email | max:50 | unique:users,email,'. $user->id,
            'bio' => 'required | string | max:255',
            'order' => 'required',
            'password' => 'min:4',
        ]);
        // $name = time().'.' . explode('/', explode(':', substr($request->photo, 0, strpos($request->photo, ';')))[1])[1];
        
        if (!empty($request->password)) {
            $request->merge(
                ['password' => Hash::make($request['password'])]
            );
        }
        $user->update($request->all());
        
        
    }
    public function profile()
    {

        return auth('api')->user();
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        
        $user= User::findOrFail($id);
       
        $this->validate($request, [
            'name' => 'required | string | max:50',
            'email' => 'required | string | email | max:50 | unique:users,email,'. $user->id,
            'bio' => 'required | string | max:255',
            'order' => 'required',
            'password' => 'sometimes|min:4',
        ]);
        $user->update($request->all());

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        $user->delete();

    }
}
