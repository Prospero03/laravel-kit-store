<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\ImageUploader;
use App\Http\Controllers\Controller;
use App\Http\Requests\AdminStoreRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'asc');

        $admins = User::select('id', 'name', 'email', 'image', 'phone', 'created_at')
        ->when($search, function($query, $search){
            $query->where('name','like','%'.$search.'%')
            ->orWhere('email','like','%'.$search.'%')
            ->orWhere('phone','like','%'.$search.'%');
        })
        ->where('role','=','admin')
        ->orderBy($sort,$direction)
        ->paginate($perPage)->withQueryString();

        return Inertia::render('admin/admins/index',[
            'admins'=> $admins,
            'filters'=>[
                'search'=>$search,
                'sort'=>$sort,
                'direction'=>$direction,
                'perPage'=>$perPage,
                'page'=>$request->input('page',1),
            ],
            'can'=>[
                'create'=>true,
                'edit'=>true,
                'delete'=>true,
            ]
        ]);
    }

    public function create(Request $request):Response
    {
        return Inertia::render('admin/admins/create');
    }

    public function store(AdminStoreRequest $request): RedirectResponse
    {
        $data = $request->only('name','email','phone','password');

        if($request->hasFile('avatar')){
            $data['avatar'] = ImageUploader::uploadedImage($request->file('avatar'), 'admins');
        }

        $data['password'] = bcrypt($data['password']);
        $data['role'] = 'admin';

        User::create($data);
        return redirect()->route('admin.admins.index')->with('success','Admin');

    } 
}

//13:27