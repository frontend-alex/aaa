"use client";

import { isProd } from "@/config/env";
import { Preloader } from "@/components/Preloader";
import { setScrollEnabled } from "@/lib/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

gsap.registerPlugin(ScrollTrigger);

interface PreloaderContextValue {
    completed: boolean;
    registerOnComplete: (callback: () => void) => () => void;
}

const PreloaderContext = createContext<PreloaderContextValue>({
    completed: false,
    registerOnComplete: () => () => { },
});

// Module-level flag — resets on every page load/refresh, persists across client-side navigations
let hasShownPreloader = false;

function PreloaderProvider({ children }: { children: React.ReactNode }) {
    const shouldSkip = !isProd || hasShownPreloader;

    const [completed, setCompleted] = useState(shouldSkip);
    const callbacksRef = useRef<Set<() => void>>(new Set());

    const registerOnComplete = useCallback((callback: () => void) => {
        callbacksRef.current.add(callback);

        // If already completed, fire the callback immediately
        if (shouldSkip) {
            callback();
        }

        // Return unregister function
        return () => {
            callbacksRef.current.delete(callback);
        };
    }, [shouldSkip]);

    const handlePreloaderComplete = useCallback(() => {
        hasShownPreloader = true;
        setCompleted(true);
        callbacksRef.current.forEach((cb) => cb());

        // Recalculate all ScrollTrigger positions after the preloader exits
        // and the layout has settled
        requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });
    }, []);

    // Safety: ensure scroll is enabled if we skip the preloader
    useEffect(() => {
        if (shouldSkip) {
            setScrollEnabled(true);
        }
    }, [shouldSkip]);

    return (
        <PreloaderContext.Provider value={{ completed, registerOnComplete }}>
            {isProd && !completed && (
                <Preloader onComplete={handlePreloaderComplete} />
            )}
            {children}
        </PreloaderContext.Provider>
    );
}

function usePreloader() {
    return useContext(PreloaderContext);
}

export { PreloaderProvider, usePreloader };

