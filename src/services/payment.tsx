import React from 'react';
import { loadStripe, Stripe } from "@stripe/stripe-js";

const stripePromise: Promise<Stripe | null> = loadStripe("pk_live_hi4DC3a4O3XqCF6pG12n2wu7");

interface CheckoutSessionResponse {
  id: string;
  [key: string]: any; // Pour les autres propriétés de la réponse
}

export const handleSubscription = async (): Promise<void> => {
  try {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error("Stripe n'a pas pu être initialisé");
    }
    
    console.log("Envoi de la requête au serveur...");
    const response = await fetch(
      "https://site--back-lovelyplace-main--dqd24mcv82s5.code.run/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: "premium",
          price: 7.99,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Réponse serveur non-ok:", response.status, errorText);
      throw new Error(`Erreur serveur: ${response.status} - ${errorText}`);
    }

    const responseData: CheckoutSessionResponse = await response.json();
    console.log("Réponse du serveur:", responseData);

    const sessionId = responseData.id;

    if (!sessionId) {
      console.error("Données de réponse complètes:", responseData);
      throw new Error("Session ID manquant dans la réponse");
    }

    console.log("Redirection vers Stripe avec sessionId:", sessionId);
    const result = await stripe.redirectToCheckout({
      sessionId: sessionId,
    });

    if (result.error) {
      console.error("Erreur lors de la redirection:", result.error);
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error("Erreur complète:", error);
    alert(
      "Une erreur est survenue lors de la redirection vers la page de paiement. Vérifiez la console pour plus de détails."
    );
  }
};
