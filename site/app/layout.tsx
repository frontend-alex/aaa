import "@/styles/globals.css";

import LenisProvider from "@/components/providers/lenis-provider";
import { PreloaderProvider } from "@/components/providers/preloader-context";

import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LenisProvider>
          <PreloaderProvider>
            <div className="relative z-10 bg-background w-full shadow-2xl">
              <main className="flex flex-col gap-30 justify-between min-h-screen w-full">
                {children}
                <Footer />
              </main>
            </div>
          </PreloaderProvider>
        </LenisProvider>
      </body >
    </html >
  );
}
