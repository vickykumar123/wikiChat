import { create } from "zustand";
import { Subscription } from "@/types/subscription";

export type LanguagesSupported =
  | "en"
  | "hi"
  | "kn"
  | "de"
  | "fr"
  | "es"
  | "ja"
  | "la"
  | "uk"
  | "ru"
  | "ar"
  | "zh-TW";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: "English",
  hi: "Hindi",
  kn: "Kannada",
  de: "German",
  fr: "French",
  es: "Spanish",
  ja: "Japanese",
  la: "Latin",
  uk: "Ukrainian",
  ru: "Russian",
  ar: "Arabic",
  "zh-TW": "Chinese",
};

interface LanguageState {
  language: LanguagesSupported;
  setLanguage: (language: LanguagesSupported) => void;
  getLanguages: (isPro: boolean) => LanguagesSupported[];
  getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

const LANGUAGES_IN_FREE = 3;

export const useLanguageStore = create<LanguageState>()((set, get) => ({
  language: "en",
  setLanguage: (language: LanguagesSupported) => set({ language }),
  getLanguages: (isPro: boolean) => {
    //if user is pro return all supported languages
    if (isPro)
      return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];

    //if not pro, return only three lanuages
    return Object.keys(LanguagesSupportedMap).slice(
      0,
      LANGUAGES_IN_FREE
    ) as LanguagesSupported[];
  },
  getNotSupportedLanguages: (isPro: boolean) => {
    if (isPro) return [];
    return Object.keys(LanguagesSupportedMap).slice(
      LANGUAGES_IN_FREE
    ) as LanguagesSupported[];
  },
}));

interface SubscriptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
