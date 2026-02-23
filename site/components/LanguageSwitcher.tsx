"use client";

import { useTranslate } from "@/hooks/useTranslate";
import { usePathname } from "next/navigation";
import { useTransitionRouter } from "next-transition-router";
import Image from "next/image";

export function LanguageSwitcher() {
    const { language, setLanguage } = useTranslate();
    const pathname = usePathname();
    const router = useTransitionRouter();

    const toggleLanguage = () => {
        const newLang = language === "en" ? "bg" : "en";
        setLanguage(newLang);

        let newPath = pathname;
        if (pathname.startsWith(`/${language}`)) {
            newPath = pathname.replace(`/${language}`, `/${newLang}`);
        } else {
            newPath = `/${newLang}${pathname}`;
        }

        router.push(newPath);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="uppercase text-sm font-semibold tracking-wider hover:text-gray-400 transition-colors"
            aria-label="Toggle language"
        >
            {language === "en" ?
                <Image
                    width={30}
                    height={30}
                    src="/images/flags/bg.svg"
                    alt="Bulgarian Flag"
                />
                :
                <Image
                    width={30}
                    height={30}
                    src="/images/flags/gb.svg"
                    alt="English Flag"
                />
            }
        </button>
    );
}
