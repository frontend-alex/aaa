import "@/styles/globals.css";

import LenisProvider from "@/components/providers/lenis-provider";

import { Navbar } from "@/components/Navbar";

import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";

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
          <main className="flex flex-col gap-30 justify-between min-h-screen w-full">
            <Navbar />
            {children}
          </main>
        </LenisProvider>
      </body>
    </html>
  );
}
