<?php

use App\Models\Character;
use App\Models\User;
use Database\Seeders\PermissionsSeeder;
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
    $this->seed(PermissionsSeeder::class);
    actingAs($this->user);
});

it('can render shared characters page', function () {
    get('/characters')
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('character/Shared')
        );
});

it('can render character creation form', function () {
    get('/characters/create')
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('character/Create')
        );
});

it('can be created by user', function () {
    $character = Character::factory()->for($this->user)->make();

    post('/characters', $character->toArray())->assertRedirect();

    assertDatabaseHas('characters', [
        'name' => $character->name,
        'user_id' => $this->user->id,
    ]);
});

it('can render character detail page', function () {
    $character = Character::factory()->for($this->user)->hasComments(3)->create();

    get("/characters/{$character->id}")
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('character/Detail')
            ->has('character')
            ->has('comments')
        );
});

it('can render character edit form', function () {
    $character = Character::factory()->for($this->user)->create();

    get("/characters/{$character->id}/edit")
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('character/Edit')
            ->has('character')
            ->has('items')
        );

});

it('can be edited by user', function () {
    $character = Character::factory()->for($this->user)->create();

    patch("/characters/{$character->id}", [
        'name' => 'mark',
        'items' => [],
    ])
        ->assertRedirect();

    assertDatabaseHas('characters', [
        'name' => 'mark',
        'user_id' => $this->user->id,
    ]);
});

it('can be deleted by user', function () {
    $character = Character::factory()->for($this->user)->create();

    delete("/characters/{$character->id}")
        ->assertRedirect();

    assertDatabaseMissing('characters', ['id' => $character->id]);
});

it('can be shared by user', function () {
    $character = Character::factory()->for($this->user)->create([
        'is_shared' => false,
    ]);

    patch("/characters/{$character->id}/share")
        ->assertRedirect();
});

it('can be unshared by user', function () {
    $character = Character::factory()->for($this->user)->create([
        'is_shared' => true,
    ]);

    patch("/characters/{$character->id}/unshare")
        ->assertRedirect();
});

it('can be approved by moderator/admin', function () {
    $character = Character::factory()->for($this->user)->create([
        'is_approved' => false,
    ]);

    patch("/characters/{$character->id}/approve")
        ->assertForbidden();

    $this->user->assignRole('Moderator');

    patch("/characters/{$character->id}/approve")
        ->assertRedirect();
});

it('can be rejected by moderator/admin', function () {
    $character = Character::factory()->for($this->user)->create([
        'is_approved' => true,
    ]);

    delete("/characters/{$character->id}/reject", [
        'reason' => 'mock reason',
    ])
        ->assertForbidden();

    $this->user->assignRole('Moderator');

    delete("/characters/{$character->id}/reject", [
        'reason' => 'mock reason',
    ])
        ->assertRedirect();

    assertDatabaseMissing('characters', ['id' => $character->id]);
});
