<?php

namespace App\Http\Controllers;

use App\Models\Character;
use Illuminate\Http\Request;

class CharacterController extends Controller
{
    public function index(Request $request)
    {
        $characters = Character::where('isShared', true)->get();

        return inertia('Characters', ['characters' => $characters->toArray()]);
    }

    public function create()
    {
        return inertia('character/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'unique:App\Models\Character', 'string', 'min:3', 'max:50'],
            'gender' => ['required', 'string', 'min:3', 'max:50'],
            'skin_color' => ['required', 'string', 'max:50'],
            'eye_color' => ['required', 'string', 'max:50'],
            'eye_shape' => ['required', 'string',  'max:50'],
            'hair_color' => ['required', 'string',  'max:50'],
            'nose_shape' => ['required', 'string',  'max:50'],
            'mouth_shape' => ['required', 'string', 'max:50'],
        ]);

        Character::create([
            'user_id' => $request->user()->id,
            'name' => $request->input('name'),
            'gender' => $request->input('gender'),
            'skin_color' => $request->input('skin_color'),
            'eye_color' => $request->input('eye_color'),
            'eye_shape' => $request->input('eye_shape'),
            'hair_color' => $request->input('hair_color'),
            'nose_shape' => $request->input('nose_shape'),
            'mouth_shape' => $request->input('mouth_shape'),
        ]);

        return redirect('/profile');
    }

    public function show(Request $request, Character $character)
    {
        return inertia('character/Detail', [
            'character' => $character,
            'comments' => $character->comments,
        ]);
    }

    public function edit(Request $request)
    {
        return inertia('CharacterEdit');
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
