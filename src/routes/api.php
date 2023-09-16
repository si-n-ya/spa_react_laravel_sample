<?php

use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout']);

Route::group(['middleware' => 'auth:sanctum'], function() {
    Route::apiResource('tasks', 'App\Http\Controllers\TaskController');
    Route::patch('tasks/update-done/{task}', [TaskController::class, 'updateDone']);
    Route::get('user', function (Request $request) {
        return $request->user();
    });
});