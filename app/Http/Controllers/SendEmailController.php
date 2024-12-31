<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

/**
 * @OA\Tag(
 *     name="Emails",
 *     description="Operations related to sending emails"
 * )
 */
class SendEmailController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/send-email",
     *     summary="Send an email",
     *     tags={"Emails"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="to", type="string", description="Recipient email address"),
     *             @OA\Property(property="subject", type="string", description="Email subject"),
     *             @OA\Property(property="body", type="string", description="Email body content")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Email sent successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Email envoyé avec succès.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Failed to send email",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Erreur lors de l'envoi de l'email."),
     *             @OA\Property(property="error", type="string")
     *         )
     *     )
     * )
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
