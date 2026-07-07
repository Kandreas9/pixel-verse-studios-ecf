<?php

namespace App\Http\Controllers;

use App\Mail\CommentReviewed;
use App\Models\Character;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Character $character)
    {
        $character->comments()->create([
            'user_id' => $request->user()->id,
            'text' => $request->string('text'),
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();

        return back();

    }

    public function approve(Comment $comment)
    {
        Mail::to($comment->user->email)->queue(new CommentReviewed('Your comment has been approved', ''));

        $comment->update([
            'is_approved' => true,
        ]);

        return back();
    }

    public function reject(Request $request, Comment $comment)
    {
        Mail::to($comment->user->email)->queue(new CommentReviewed('Your comment has been rejected and deleted', $request->input('reason')));

        $comment->delete();

        return back();
    }
}
