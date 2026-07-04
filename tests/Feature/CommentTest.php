<?php

use App\Models\Character;
use App\Models\Comment;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\delete;
use function Pest\Laravel\patch;
use function Pest\Laravel\post;

beforeEach(function () {
    $this->user = User::factory()->create();
    actingAs($this->user);
});

it('can be created by user', function () {
    $character = Character::factory()->for($this->user)->create();

    post("/characters/{$character->id}/comments", [
        'text' => 'this is a comment',
    ])->assertRedirect();

    assertDatabaseHas(Comment::class, [
        'user_id' => $this->user->id,
        'character_id' => $character->id,
        'text' => 'this is a comment',
    ]);
});

/*
it('can be edited by user', function () {
    $character = Character::factory()->for($this->user)->create();

    patch("/characters/{$character->id}", [
        'name' => 'mark',
    ])
        ->assertRedirect();

    assertDatabaseHas('characters', [
        'name' => 'mark',
        'user_id' => $this->user->id,
    ]);
});

it('can be deleted by user', function () {
    $comment = Comment::factory()->create();

    delete("/comments/{$comment->id}")
        ->assertRedirect();

    assertDatabaseMissing('comments', ['id' => $comment->id]);
});
*/

it('can be approved by moderator/admin', function () {
    $comment = Comment::factory()->create([
        'is_approved' => false,
    ]);

    patch("/comments/{$comment->id}/approve")
        ->assertRedirect();
});

it('can be rejected by moderator/admin', function () {
    $comment = Comment::factory()->create([
        'is_approved' => true,
    ]);

    patch("comments/{$comment->id}/reject")
        ->assertRedirect();
});
