<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HousingController;

Route::get('/housings/search', [HousingController::class, 'search']);