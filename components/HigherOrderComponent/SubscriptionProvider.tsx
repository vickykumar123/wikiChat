"use client";

import { useSubscriptionStore } from "@/Zustand/store";
import { subscriptionRef } from "@/lib/converters/Subsctiption";
import { error } from "console";
import { onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const setSubscription = useSubscriptionStore(
    (state) => state.setSubscription
  );

  useEffect(() => {
    if (!session) return;

    return onSnapshot(
      subscriptionRef(session.user.id),
      (snapshot) => {
        if (snapshot.empty) {
          console.log("User has NO subscription");
          setSubscription(null);
          return;
        } else {
          console.log("User has subscription");
          setSubscription(snapshot.docs[0].data());
        }
      },
      (error) => {
        console.log("Error getting document:", error);
        // setSubscription(null);
      }
    );
  }, [session, setSubscription]);
  return <>{children}</>;
}
