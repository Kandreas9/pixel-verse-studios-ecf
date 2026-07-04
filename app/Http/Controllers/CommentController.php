<?php

namespace App\Http\Controllers;

use App\Models\Character;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
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
    public function store(Request $request, Character $character)
    {
        $character->comments()->create([
            'user_id' => $request->user()->id,
            'text' => $request->string('text'),
        ]);

        return redirect('/');
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }

    public function approve(Comment $comment)
    {

        $comment->update([
            'is_approved' => true,
        ]);

        return back();
    }

    public function reject(Comment $comment)
    {

        $comment->update([
            'is_approved' => false,
        ]);

        return back();
    }
}
