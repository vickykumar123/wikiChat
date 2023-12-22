"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Checkout() {
  const { data: session } = useSession();
  const router = useRouter();

  async function createCheckoutSession() {
    if (!session) return;
    // push a document into firestore db

    // ... stripe extension on firebase will create a checkout session
    //redirect user to checkout page

    try {
      const stripe = await stripePromise;
      const response = await fetch("/api/checkout_session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);
      // const data = await response.json();

      // console.log(data);
      // const { error } = await stripe!.redirectToCheckout({
      //   sessionId,
      // });

      // if (error) {
      //   router.push("/chat");
      // }
    } catch (err) {
      console.error("Error in creating checkout session:", err);
      router.push("/");
    }
  }
  return (
    <div className="flex flex-col space-y-2">
      <button
        onClick={() => createCheckoutSession()}
        className="mt-8 rounded-md bg-indigo-600 px-3.5 py-2 text-center text-lg font-semibold leading-6 text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80"
      >
        Sign up
      </button>
    </div>
  );
}
