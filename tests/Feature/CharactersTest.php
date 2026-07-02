<?php

use App\Models\Character;
use App\Models\User;
use Inertia\Testing\AssertableInertia;

use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\delete;
use function Pest\Laravel\get;
use function Pest\Laravel\patch;
use function Pest\Laravel\post;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);
});

it('can be created by user', function () {
    post('/characters', [
        'name' => 'john',
    ])->assertRedirect();

    assertDatabaseHas('characters', [
        'name' => 'john',
        'user_id' => $this->user->id,
    ]);
});

it('can be viewed by user', function () {
    $character = Character::factory()->for($this->user)->create(['name' => 'john']);

    get('/my-characters')
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page->
            component('MyCharacters')->
            has('characters')
        );
});

it('can be edited by user', function () {
    $character = Character::factory()->for($this->user)->create(['name' => 'john']);

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
    $character = Character::factory()->for($this->user)->create(['name' => 'john']);

    delete("/characters/{$character->id}")
        ->assertRedirect();

    assertDatabaseMissing('characters', ['id' => $character->id]);
});
