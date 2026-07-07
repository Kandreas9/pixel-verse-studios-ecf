<?php

namespace App\Http\Controllers;

use App\Mail\CharacterReviewed;
use App\Models\Character;
use App\Models\CharacterLog;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class CharacterController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $characters = Character::with('user')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->where('is_shared', true)->get();

        return inertia('character/Shared', [
            'characters' => $characters->toArray(),
            'filters' => [
                'search' => $search,
            ],
        ]);
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

    public function show(Character $character)
    {
        return inertia('character/Detail', [
            'character' => $character->load('items')->load('user'),
            'comments' => $character->comments->load('user')->load('ratings'),
        ]);
    }

    public function edit(Character $character)
    {
        $character->load('items');
        $activeItems = Item::where('is_active', true)->get();

        return inertia('character/Edit', ['character' => $character, 'items' => $activeItems->toArray()]);
    }

    public function update(Request $request, Character $character)
    {
        $validated = $request->validate([
            'name' => ['string', 'min:3', 'max:50'],
            'gender' => ['string', 'min:3', 'max:50'],
            'skin_color' => ['string', 'max:50'],
            'eye_color' => ['string', 'max:50'],
            'eye_shape' => ['string',  'max:50'],
            'hair_color' => ['string',  'max:50'],
            'nose_shape' => ['string',  'max:50'],
            'mouth_shape' => ['string', 'max:50'],
        ]);

        $character->fill($validated);

        // Find changed in character
        $changed = [];
        foreach ($character->getDirty() as $field => $newValue) {
            $changed[$field] = $newValue;
        }

        // Find id for each item checked
        $checkedItemIds = [];
        foreach ($request->input('items') as $key => $value) {
            $checkedItemIds[] = Item::where('name', $key)->value('id');
        }

        $character->items()->sync($checkedItemIds);

        // Create mongo character log
        CharacterLog::create([
            'user_id' => $character->user_id,
            'name' => $character->name,
            'changes' => $changed,
            'items' => $checkedItemIds,
        ]);

        $character->save();

        return redirect('/profile');
    }

    public function destroy(Character $character)
    {
        $character->delete();

        return back();
    }

    public function share(Character $character)
    {

        $character->update([
            'is_shared' => true,
        ]);

        return back();
    }

    public function unshare(Character $character)
    {

        $character->update([
            'is_shared' => false,
        ]);

        return back();
    }

    public function approve(Character $character)
    {
        Mail::to($character->user->email)->queue(new CharacterReviewed("Your character named {$character->name} has been approved", ''));

        $character->update([
            'is_approved' => true,
        ]);

        return back();
    }

    public function reject(Request $request, Character $character)
    {
        Mail::to($character->user->email)->queue(new CharacterReviewed("Your character named {$character->name} has been rejected and deleted", $request->input('reason')));

        $character->delete();

        return back();
    }
}
