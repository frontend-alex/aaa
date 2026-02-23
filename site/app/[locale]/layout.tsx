import "@/styles/globals.css";

import LenisProvider from "@/components/providers/lenis-provider";

import { PreloaderProvider } from "@/components/providers/preloader-context";
import { Analytics } from "@vercel/analytics/next"

import type { Metadata } from "next";

import { Geist, Geist_Mono, Inter } from "next/font/google";
import { TransitionFade } from "@/components/providers/transition/transition-fade";
import { TranslationProvider } from "@/lib/context/TranslationContext";
import { CookieConsent } from "@/components/CookieConsent";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AAA Architecture",
  description: "AAA Architecture",
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children, params } = props;
  const resolvedParams = await params;
  const locale = resolvedParams?.locale as any || "en";

  return (
    <html lang={locale} className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TranslationProvider initialLanguage={locale}>
          <TransitionFade>
            <LenisProvider>
              <PreloaderProvider>
                <main className="flex flex-col justify-between min-h-screen w-full">
                  {children}
                </main>
                <CookieConsent />
                <Analytics />
              </PreloaderProvider>
            </LenisProvider>
          </TransitionFade>
        </TranslationProvider>
      </body>
    </html >
  );
}
