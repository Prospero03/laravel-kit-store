<?php

use App\Http\Middleware\AdminCheckMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth',AdminCheckMiddleware::class])->group(function(){
    Route::prefix('admin')->name('admin.')->group(function(){

    });
});