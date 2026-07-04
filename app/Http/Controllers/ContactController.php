<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        Contact::create(
            $request->validate([
                'email' => ['required', 'email'],
                'name' => ['required', 'string', 'min:3', 'max:50'],
                'details' => ['required', 'string', 'min:3', 'max:50'],
            ]));
    }
}
