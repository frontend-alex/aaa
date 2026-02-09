"use client";

import { isProd } from "@/config/env";
import { Preloader } from "@/components/Preloader";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

interface PreloaderContextValue {
    completed: boolean;
    registerOnComplete: (callback: () => void) => () => void;
}

const PreloaderContext = createContext<PreloaderContextValue>({
    completed: false,
    registerOnComplete: () => () => { },
});

const STORAGE_KEY = "preloader-shown";

function PreloaderProvider({ children }: { children: React.ReactNode }) {
    const alreadyShown = typeof window !== "undefined" && sessionStorage.getItem(STORAGE_KEY) === "true";
    const shouldSkip = !isProd || alreadyShown;

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
        setCompleted(true);
        sessionStorage.setItem(STORAGE_KEY, "true");
        callbacksRef.current.forEach((cb) => cb());
    }, []);

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
