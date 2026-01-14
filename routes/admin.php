<?php



// Route::middleware(['auth', AdminCheckMiddleware::class])->group(function () {
//     Route::prefix('admin')->name('admin.')->group(function () {
//         Route::resource('users', UserController::class);
//     });
// });

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Middleware\AdminCheckMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', AdminCheckMiddleware::class])->group(function () {
    
    Route::prefix('admin')->name('admin.')->group(function () {
            Route::get('/dashboard', function () {
                return Inertia::render('admin/dashboard'); 
            })->name('dashboard');
            
            Route::resource('users', UserController::class);
            Route::resource('admins', AdminController::class);
    });
});

//php artisan wayfinder:generate