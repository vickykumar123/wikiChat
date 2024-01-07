import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { ThemeProvider } from "@/components/DarkMode/ThemeProvider";
import ClientProvider from "@/components/ClientProvider";
import FirebaseAuthProvider from "@/components/HigherOrderComponent/FirebaseAuthProvider";
import ReduxProvider from "@/components/HigherOrderComponent/ReduxProvider";
import SubscriptionProvider from "@/components/HigherOrderComponent/SubscriptionProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wiki Translator",
  description: "Translation app for anyone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <ClientProvider>
        <html lang="en">
          <body className="flex flex-col min-h-screen">
            <FirebaseAuthProvider>
              <SubscriptionProvider>
                <ThemeProvider //for DarkMode
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                  <Header />
                  {children}
                  <Toaster />
                </ThemeProvider>
              </SubscriptionProvider>
            </FirebaseAuthProvider>
          </body>
        </html>
      </ClientProvider>
    </ReduxProvider>
  );
}
