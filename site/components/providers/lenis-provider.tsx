"use client";

import { ReactNode, useEffect } from "react";
import { initLenis, destroyLenis } from "@/lib/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        const lenis = initLenis();
        if (!lenis) return;

        // Sync Lenis scroll position with ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // Drive Lenis via GSAP ticker (replaces manual rAF loop)
        const tickerCallback = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tickerCallback);
            lenis.off("scroll", ScrollTrigger.update);
            destroyLenis();
        };
    }, []);

    return <>{children}</>;
}

