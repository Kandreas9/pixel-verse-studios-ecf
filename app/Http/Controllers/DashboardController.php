<?php

namespace App\Http\Controllers;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\Character;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class DashboardController extends Controller
{
    use PasswordValidationRules, ProfileValidationRules;

    public function index()
    {
        return inertia('dashboard/Index');
    }

    public function characters()
    {
        $characters = Character::with('user')->get();

        return inertia('dashboard/Characters', ['characters' => $characters->toArray()]);

    }

    public function users()
    {
        $users = User::doesntHave('roles')->get();

        return inertia('dashboard/Users', ['users' => $users->toArray()]);
    }

    public function userDestroy(Request $request, User $user)
    {
        if ($request->user()->id === $user->id) {
            return back()->with('error', 'You cannot delete your own account.');
        }
        $user->delete();

        return back();
    }

    public function moderators()
    {
        $moderators = User::role('Moderator')->get();

        return inertia('dashboard/Moderators', ['moderators' => $moderators->toArray()]);
    }

    public function moderatorsCreate()
    {
        return inertia('dashboard/ModeratorCreate', [
            'passwordRules' => Password::defaults()->toPasswordRulesString(),
        ]);
    }

    public function moderatorsStore(Request $request)
    {
        Validator::make($request->input(), [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
        ])->validate();

        $moderator = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ]);

        $moderator->assignRole('Moderator');

        return redirect('/dashboard/moderators');
    }

    public function moderatorsPasswordEdit(User $user)
    {
        return inertia('dashboard/ModeratorPasswordEdit', ['moderator' => $user]);
    }

    public function moderatorsPasswordUpdate(Request $request, User $user)
    {
        $validated = $request->validate(['password' => ['required', 'string', Password::default(), 'confirmed']]);

        $user->update([
            'password' => $validated['password'],
        ]);

        return redirect('/dashboard/moderators');
    }
}
