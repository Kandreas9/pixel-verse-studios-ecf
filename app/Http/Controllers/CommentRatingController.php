<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Rating;
use Illuminate\Http\Request;

class CommentRatingController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Comment $comment)
    {
        $rating = Rating::create([
            'user_id' => $request->user()->id,
        ]);

        $comment->ratings()->attach($rating->id);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment, Rating $rating)
    {
        $comment->ratings()->detach($rating->id);

        $rating->delete();

        return back();
    }
}
