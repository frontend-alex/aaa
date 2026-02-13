import "@/styles/globals.css";

import { Navbar } from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar className="p-5" landing={false} />
      {children}
    </>
  );
}
