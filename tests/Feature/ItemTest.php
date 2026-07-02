<?php

use App\Models\User;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    $this->user = User::factory()->create();
    actingAs($this->user);
});

it('can render items page', function () {});

it('can render items creation form', function () {});

it('can be created by moderator', function () {});

it('can render item detail page', function () {});

it('can render items edit form', function () {});

it('can be updated by moderator', function () {});

it('can be deleted by moderator', function () {});

it('can only be fetched by user if active', function () {});
