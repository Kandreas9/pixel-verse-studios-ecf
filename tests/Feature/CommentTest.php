<?php

use App\Models\Character;
use App\Models\Comment;
use App\Models\Rating;
use App\Models\User;
use Database\Seeders\PermissionsSeeder;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\delete;
use function Pest\Laravel\patch;
use function Pest\Laravel\post;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->seed(PermissionsSeeder::class);
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

it('can be deleted by moderator/admin', function () {
    $comment = Comment::factory()->create();

    $this->user->assignRole('Moderator');

    delete("/comments/{$comment->id}")
        ->assertRedirect();

    assertDatabaseMissing('comments', ['id' => $comment->id]);
});

it('can be approved by moderator/admin', function () {
    $comment = Comment::factory()->create([
        'is_approved' => false,
    ]);

    $this->user->assignRole('Moderator');

    patch("/comments/{$comment->id}/approve")
        ->assertRedirect();
});

it('can be rejected by moderator/admin', function () {
    $comment = Comment::factory()->create([
        'is_approved' => true,
    ]);

    $this->user->assignRole('Moderator');

    delete("comments/{$comment->id}/reject", [
        'reason' => 'this is a reason',
    ])
        ->assertRedirect();
});

it('can be liked', function () {
    $comment = Comment::factory()->create([
        'is_approved' => true,
    ]);

    post("/comments/{$comment->id}/ratings")->assertRedirect();

    $rating = $comment->fresh()->ratings()->first();

    expect($rating)->not->toBeNull();

    assertDatabaseHas('comment_rating', [
        'comment_id' => $comment->id,
        'rating_id' => $rating->id,
    ]);
});

it('can be unliked', function () {
    $comment = Comment::factory()->create([
        'is_approved' => true,
    ]);
    $rating = Rating::factory()->create([
        'user_id' => $this->user->id,
    ]);

    $comment->ratings()->attach($rating->id);

    delete("/comments/{$comment->id}/ratings/{$rating->id}")->assertRedirect();

    assertDatabaseMissing('comment_rating', [
        'comment_id' => $comment->id,
        'rating_id' => $rating->id,
    ]);
});
