<?php

use App\Models\Character;
use App\Models\User;
use Inertia\Testing\AssertableInertia;

use function Pest\Laravel\actingAs;
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

it('can render shared characters page', function () {
    get('/characters')
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Characters')
        );
});

it('can render character creation form', function () {
    get('/characters/create')
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('CharacterCreate')
        );
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

/*
it('can be viewed by user', function () {
    $character = Character::factory()->for($this->user)->create(['name' => 'john']);

    get('/my-characters')
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page->
            component('MyCharacters')->
            has('characters')
        );
});
*/

it('can render character detail page', function () {
    $character = Character::factory()->for($this->user)->create(['name' => 'john']);

    get("/characters/{$character->id}")
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('CharacterDetail')
            ->has('character')
        );
});

it('can render character edit form', function () {
    $character = Character::factory()->for($this->user)->create(['name' => 'john']);

    get("/characters/{$character->id}/edit")
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('CharacterEdit')
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

it('can only be edited by user who created character', function () {
    $character = Character::factory()->for($this->user)->create(['name' => 'john']);

    $otherUser = User::factory()->create();

    actingAs($otherUser)
        ->patch("/characters/{$character->id}", [
            'name' => 'mark',
        ])
        ->assertForbidden();
});

it('can be deleted by user', function () {
    $character = Character::factory()->for($this->user)->create(['name' => 'john']);

    delete("/characters/{$character->id}")
        ->assertRedirect();

    assertDatabaseMissing('characters', ['id' => $character->id]);
});

it('can only be deleted by user who created character', function () {
    $character = Character::factory()->for($this->user)->create(['name' => 'john']);

    $otherUser = User::factory()->create();

    actingAs($otherUser)
        ->delete("/characters/{$character->id}")
        ->assertForbidden();
});
