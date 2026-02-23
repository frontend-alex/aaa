"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SmallText, MediumText } from "@/components/components";
import { useTranslate } from "@/hooks/useTranslate";
import { Button } from "./custom/button";
import { setScrollEnabled } from "@/lib/lenis";

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const { language } = useTranslate();

    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) {
            // Slight delay to not overwhelm on initial paint
            const timer = setTimeout(() => {
                setIsVisible(true);
                setScrollEnabled(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        setIsVisible(false);
        setScrollEnabled(true);
        localStorage.setItem("cookie_consent", "true");
        // We'll also refresh the locale cookie just in case it wasn't saved yet
        document.cookie = `NEXT_LOCALE=${language}; path=/; max-age=31536000; SameSite=Lax`;
    };

    const handleDecline = () => {
        setIsVisible(false);
        setScrollEnabled(true);
        localStorage.setItem("cookie_consent", "false");
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed h-screen flex items-end justify-center bottom-0 left-0 w-full z-[100] p-4 md:p-8"
                >
                    <div className="bg-black/60 h-screen fixed top-0 left-0 w-full -z-[99]" />
                    <div className="bg-stone-100 border border-neutral-300 w-full max-w-7xl mx-auto shadow-2xl p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex flex-col gap-2 max-w-3xl">
                            <MediumText className="font-bold">Cookies & Privacy</MediumText>
                            <SmallText className="leading-snug text-neutral-600">
                                {language === "bg" ? "Този уебсайт използва бисквитки, за да гарантира, че получавате най-доброто изживяване." : "This website uses cookies to ensure you get the best experience on our website."}
                            </SmallText>
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            <Button
                                variant="outline"
                                className="rounded-none"
                                circle
                                onClick={handleDecline}
                            >
                                {language === "bg" ? "Отказ" : "Decline"}
                            </Button>
                            <Button
                                onClick={handleAccept}
                            >
                                {language === "bg" ? "Приемам" : "Accept"}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )
            }
        </AnimatePresence >
    );
}
