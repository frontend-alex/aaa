"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "@/lib/i18n/dictionaries";

interface TranslationContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children, initialLanguage }: { children: React.ReactNode, initialLanguage?: Language }) {
    const [language, setLanguage] = useState<Language>(initialLanguage || "en");

    useEffect(() => {
        const storedLang = document.cookie
            .split("; ")
            .find((row) => row.startsWith("NEXT_LOCALE="))
            ?.split("=")[1] as Language;

        // If we want to override via cookie on client side without a refresh, but typically SSR params are the truth
        // We do not overwrite initialLanguage unless user changes it interactively
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    };

    return (
        <TranslationContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
            {children}
        </TranslationContext.Provider>
    );
}

export function useTranslationContext() {
    const context = useContext(TranslationContext);
    if (context === undefined) {
        throw new Error("useTranslationContext must be used within a TranslationProvider");
    }
    return context;
}
