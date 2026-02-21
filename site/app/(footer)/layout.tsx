import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function NormalPagesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex flex-col justify-between min-h-screen w-full">
            <Navbar />
            {children}
            <Footer />
        </main>
    );
}
