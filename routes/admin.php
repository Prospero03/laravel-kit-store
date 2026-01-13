<?php



// Route::middleware(['auth', AdminCheckMiddleware::class])->group(function () {
//     Route::prefix('admin')->name('admin.')->group(function () {
//         Route::resource('users', UserController::class);
//     });
// });

use App\Http\Controllers\Admin\UserController;
use App\Http\Middleware\AdminCheckMiddleware;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;


Route::middleware(['auth', AdminCheckMiddleware::class])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('admin/dashboard'); // <-- путь к твоему React компоненту
    })->name('dashboard');

    Route::resource('users', UserController::class);
});

