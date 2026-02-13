"use client";

import { ReactNode, useEffect, useRef } from "react";
import { initLenis, destroyLenis } from "@/lib/lenis";

export default function LenisProvider({ children }: { children: ReactNode }) {
    const rafId = useRef<number | null>(null);

    useEffect(() => {
        const lenis = initLenis();
        if (!lenis) return;

        const raf = (time: number) => {
            lenis.raf(time);
            rafId.current = requestAnimationFrame(raf);
        };

        rafId.current = requestAnimationFrame(raf);

        return () => {
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
            destroyLenis();
        };
    }, []);

    return <>{children}</>;
}

