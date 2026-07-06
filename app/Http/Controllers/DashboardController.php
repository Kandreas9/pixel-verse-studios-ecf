<?php

namespace App\Http\Controllers;

use App\Models\Character;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return inertia('dashboard/Index');
    }

    public function characters()
    {
        $characters = Character::with('user')->get();

        return inertia('dashboard/Characters', ['characters' => $characters->toArray()]);

    }

    public function users()
    {
        $users = User::doesntHave('roles')->get();

        return inertia('dashboard/Users', ['users' => $users->toArray()]);
    }

    public function userDestroy(Request $request, User $user)
    {
        if ($request->user()->id === $user->id) {
            return back()->with('error', 'You cannot delete your own account.');
        }
        $user->delete();

        return back();
    }
}
