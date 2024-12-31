<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SendEmailController extends Controller
{
    /**
     * Envoi d'un email.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendEmail(Request $request)
    {
        // Valider les données envoyées
        $request->validate([
            'to' => 'required|email',
            'subject' => 'required|string',
            'body' => 'required|string',
        ]);

        // Envoyer l'email
        try {
            Mail::raw($request->body, function ($message) use ($request) {
                $message->to($request->to)
                        ->subject($request->subject);
            });

            return response()->json(['message' => 'Email envoyé avec succès.'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Erreur lors de l\'envoi de l\'email.', 'error' => $e->getMessage()], 500);
        }
    }
}
