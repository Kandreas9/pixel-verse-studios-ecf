<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(['name' => ['required', 'string', 'min:3', 'max:50'], 'type' => ['required', 'string', 'min:3', 'max:50'], 'isActive' => ['boolean']]);

        Item::create([
            'name' => $request->input('name'),
            'type' => $request->input('type'),
            'isActive' => $request->input('isActive'),
        ]);

        return redirect('/');
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Item $item)
    {
        $validated = $request->validate(['name' => ['string', 'min:3', 'max:50'], 'type' => ['string', 'min:3', 'max:50'], 'isActive' => ['boolean']]);

        $item->update($validated);

        return redirect('/');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        $item->delete();

        return redirect('/');
    }
}
