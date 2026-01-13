<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage = $request->input('perPage', 10);
        $search = $request->input('search', '');
        $sort = $request->input('sort', 'id');
        $direction = $request->input('direction', 'asc');

        $users = User::select('id', 'name', 'email', 'phone', 'created_at')
        ->when($search, function($query, $search){
            $query->where('name','like','%'.$search.'%')
            ->orWhere('email','like','%'.$search.'%')
            ->orWhere('phone','like','%'.$search.'%');
        })
        ->where('role','!=','admin')
        ->orderBy($sort,$direction)
        ->paginate($perPage)->withQueryString();

        return Inertia::render('admin/users/index',[
            'users'=> $users,
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
}
