<?php

use App\Models\User;
use Database\Seeders\PermissionsSeeder;
use Inertia\Testing\AssertableInertia;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\delete;
use function Pest\Laravel\get;
use function Pest\Laravel\post;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->seed(PermissionsSeeder::class);
    actingAs($this->user)->withSession(['auth.password_confirmed_at' => time()]);
});

it('can not be accessed by users', function () {
    get('/dashboard/')
        ->assertForbidden();
});

it('can be accessed by moderators/admins', function () {
    $this->user->assignRole('Moderator');

    get('/dashboard/')
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('dashboard/Index')
        );
});

it('can access characters dashboard page', function () {
    $this->user->assignRole('Moderator');

    get('/dashboard/characters')
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('dashboard/Characters')
            ->has('characters')
        );
});

it('can access users dashboard page', function () {
    $this->user->assignRole('Moderator');

    get('/dashboard/users')
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('dashboard/Users')
            ->has('users')
        );
});

it('can delete users', function () {
    $this->user->assignRole('Moderator');

    $user = User::factory()->create();

    delete("/dashboard/users/{$user->id}")->assertRedirect();

    assertDatabaseMissing('users', [
        'id' => $user->id,
    ]);
});

it('can access comments dashboard page', function () {
    $this->user->assignRole('Moderator');

    get('/dashboard/comments')
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('dashboard/Comments')
            ->has('comments')
        );
});

it('can not access admin pages as moderator', function () {
    $this->user->assignRole('Moderator');

    get('/dashboard/moderators')
        ->assertForbidden();
});

it('can access admin pages as super admin', function () {
    $this->user->assignRole('Super-Admin');

    get('/dashboard/moderators')
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('dashboard/Moderators')
            ->has('moderators')
        );
});

it('can access contact logs page as super admin', function () {
    $this->user->assignRole('Super-Admin');

    get('/dashboard/contacts/logs')
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('dashboard/ContactLogs')
            ->has('contactLogs')
        );
});

it('can access character logs page as super admin', function () {
    $this->user->assignRole('Super-Admin');

    get('/dashboard/characters/logs')
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('dashboard/CharacterLogs')
            ->has('characterLogs')
        );
});

it('can access moderator create page as super admin', function () {
    $this->user->assignRole('Super-Admin');

    get('/dashboard/moderators/create')
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('dashboard/ModeratorCreate')
            ->has('passwordRules')
        );
});

it('can create a moderator as a super admin', function () {
    $this->user->assignRole('Super-Admin');

    post('/dashboard/moderators', [
        'email' => 'testmoderator@example.com',
        'name' => 'testmoderator',
        'password' => 'moderator',
    ])->assertRedirect();
});

it('can access moderator password edit page as super admin', function () {
    $this->user->assignRole('Super-Admin');

    $moderator = User::factory()->create();
    $moderator->assignRole('Moderator');

    get("/dashboard/moderators/{$moderator->id}/password/edit")
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('dashboard/ModeratorPasswordEdit')
            ->has('moderator')
        );
});
