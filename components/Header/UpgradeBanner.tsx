"use client";

import { useSubscriptionStore } from "@/Zustand/store";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function UpgradeBanner() {
  const subscription = useSubscriptionStore((state) => state.subscription);
  const isPro = subscription?.role === "pro";
  const router = useRouter();

  if (subscription === undefined || isPro) return null;

  return (
    <Button
      onClick={() => router.push("/register")}
      className="w-full rounded-none bg-gradient-to-r from-indigo-400 to-pink-400 text-center text-white px-5 py-2 hover:opacity-90 transition-all"
    >
      Upgrade to Pro to unlock all features!
    </Button>
  );
}
