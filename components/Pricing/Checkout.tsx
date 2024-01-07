"use client";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { finishLoading, startLoading } from "@/redux/stateSlice";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import Snipper from "../Snipper";
import { useSubscriptionStore } from "@/Zustand/store";
import ManageAccountButton from "./ManageAccountButton";

export default function Checkout() {
  const { data: session } = useSession();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch<AppDispatch>();

  const subscription = useSubscriptionStore((state) => state.subscription);
  const isLoadingSubscription = subscription === undefined;
  const isSubscribed =
    subscription?.status === "active" && subscription?.role === "pro";

  async function createCheckoutSession() {
    if (!session) return;
    // push a document into firestore db
    dispatch(startLoading());

    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_sessions"),
      {
        price: "price_1OTiWAHOtkIhUfJ703FX4Fes",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    // ... stripe extension on firebase will create a checkout session

    return onSnapshot(docRef, (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if (error) {
        alert(`An error occured: ${error.message}`);
        dispatch(finishLoading());
      }

      if (url) {
        window.location.assign(url);
        dispatch(finishLoading());
      }
    });

    //redirect user to checkout page
  }
  return (
    <div className="flex flex-col space-y-2">
      {isSubscribed && (
        <>
          <hr className="mt-5" />
          <p className="pt-5 text-center text-xs text-indigo-600">
            You are subscribed to Pro
          </p>
        </>
      )}

      <div className="mt-8 rounded-md bg-indigo-600 px-3.5 py-2 text-center text-lg font-semibold leading-6 text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80">
        {isSubscribed ? (
          <ManageAccountButton />
        ) : isLoadingSubscription || isLoading ? (
          <Snipper size={29} />
        ) : (
          <button onClick={() => createCheckoutSession()} disabled={isLoading}>
            Upgrade
          </button>
        )}
      </div>
    </div>
  );
}
