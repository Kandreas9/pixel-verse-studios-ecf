<?php

namespace App\Http\Controllers;

use App\Mail\ContactSubmitted;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'name' => ['required', 'string', 'min:3', 'max:50'],
            'details' => ['required', 'string', 'min:3', 'max:50'],
        ]);

        // Check is user with pseudo exists
        if (User::where('name', $request->input('name'))->doesntExist()) {
            return back()->withErrors(['validation' => 'User doesnt exist']);
        }

        $contact = Contact::create($validated);

        Mail::to('company@example.com')->queue(new ContactSubmitted($contact));
    }
}
