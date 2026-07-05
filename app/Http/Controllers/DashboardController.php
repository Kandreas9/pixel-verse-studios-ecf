<?php

namespace App\Http\Controllers;

use App\Models\Character;

class DashboardController extends Controller
{
    public function characters()
    {
        $characters = Character::with('user')->get();

        return inertia('dashboard/Characters', ['characters' => $characters->toArray()]);

    }
}
