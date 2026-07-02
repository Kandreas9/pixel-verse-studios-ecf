<?php

namespace App\Http\Controllers;

use App\Models\Character;
use Illuminate\Http\Request;

class CharacterController extends Controller
{
    public function index(Request $request)
    {
        $characters = $request->user()->characters;

        return inertia('MyCharacters', ['characters' => $characters->toArray()]);
    }

    public function store(Request $request)
    {
        $request->validate(['name' => ['required', 'string', 'min:3', 'max:50']]);

        Character::create([
            'user_id' => $request->user()->id,
            'name' => $request->input('name'),
        ]);

        return redirect('/');
    }

    public function update(Request $request, Character $character)
    {
        $validated = $request->validate(['name' => ['string', 'min:3', 'max:50']]);

        $character->update($validated);

        return redirect('/');
    }

    public function destroy(Character $character)
    {
        $character->delete();

        return redirect('/');
    }
}
