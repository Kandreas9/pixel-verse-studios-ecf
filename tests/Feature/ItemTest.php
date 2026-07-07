<?php

use App\Models\Item;
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

it('only moderators/admins can render items page', function () {
    get('/dashboard/items')
        ->assertForbidden();

    $this->user->assignRole('Moderator');

    get('/dashboard/items')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('dashboard/Items')
            ->has('items')
        );
});

it('only moderators/admins can render items creation form', function () {
    get('/dashboard/items/create')
        ->assertForbidden();

    $this->user->assignRole('Moderator');

    get('/dashboard/items/create')
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('dashboard/ItemCreate'));
});

it('can only be created by moderator/admins', function () {
    $item = Item::factory()->make();

    post('/dashboard/items', $item->toArray())->assertForbidden();

    $this->user->assignRole('Moderator');

    post('/dashboard/items', $item->toArray())->assertRedirect();

    assertDatabaseHas('items', [
        'name' => $item->name,
    ]);
});

it('only moderators/admins can render items edit form', function () {
    $item = Item::factory()->create();

    get("/dashboard/items/{$item->id}/edit")
        ->assertForbidden();

    $this->user->assignRole('Moderator');

    get("/dashboard/items/{$item->id}/edit")
        ->assertOk()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('dashboard/ItemEdit'));

});

it('can be updated by moderator/admin', function () {
    $item = Item::factory()->create();

    patch("/dashboard/items/{$item->id}", [
        'name' => 'mageblood',
    ])
        ->assertForbidden();

    $this->user->assignRole('Moderator');

    patch("/dashboard/items/{$item->id}", [
        'name' => 'mageblood',
    ])
        ->assertRedirect();

    assertDatabaseHas('items', [
        'name' => 'mageblood',
    ]);

});

it('can be deleted by moderator/admin', function () {
    $item = Item::factory()->create();

    delete("/dashboard/items/{$item->id}")
        ->assertForbidden();

    $this->user->assignRole('Moderator');

    delete("/dashboard/items/{$item->id}")
        ->assertRedirect();

    assertDatabaseMissing('items', ['id' => $item->id]);
});

it('can be activated by moderator/admin', function () {
    $item = Item::factory()->create([
        'is_active' => false,
    ]);

    patch("/dashboard/items/{$item->id}/activate")
        ->assertForbidden();

    $this->user->assignRole('Moderator');

    patch("/dashboard/items/{$item->id}/activate")
        ->assertRedirect();
});

it('can be deactivated by moderator/admin', function () {
    $item = Item::factory()->create([
        'is_active' => true,
    ]);

    patch("/dashboard/items/{$item->id}/deactivate")
        ->assertForbidden();

    $this->user->assignRole('Moderator');

    patch("/dashboard/items/{$item->id}/deactivate")
        ->assertRedirect();
});
