"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/custom/button";
import { NAV_LINKS } from "@/constants/data";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { setScrollEnabled } from "@/lib/lenis";
import { Logo } from "./Navbar";
import { Link } from "@/components/custom/link";
import { SlidingText } from "@/custom/text/sliding-text";
import { useTranslate } from "@/hooks/useTranslate";

interface MobileMenuProps {
    variant?: VariantProps<typeof buttonVariants>["variant"];
    className?: string;
    buttonClassname?: string;
}

function MobileMenu({
    variant = "secondary",
    className,
    buttonClassname,
}: MobileMenuProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useTranslate();

    const isMounted = typeof window !== "undefined";

    useEffect(() => {
        if (isMenuOpen) {
            setScrollEnabled(false);
        } else {
            setScrollEnabled(true);
        }
    }, [isMenuOpen]);

    return (
        <>
            <div className={cn("flex items-center gap-3", className)}>
                {/* <ContactSheet>
                    <Button>
                        Get in touch
                    </Button>
                </ContactSheet> */}
                <Button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    variant={variant}
                    className={buttonClassname}
                >
                    {t("menu.button")}
                </Button>
            </div>

            {isMounted &&
                createPortal(
                    <div
                        className={cn(
                            "menu-overlay font-medium text-white uppercase w-full h-full fixed top-0 left-0 p-5 bg-black z-1000 flex flex-col justify-between",
                            "transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
                            isMenuOpen
                                ? "pointer-events-auto [clip-path:polygon(0%_0%,100%_0%,100%_100%,0%_100%)]"
                                : "pointer-events-none [clip-path:polygon(0%_0%,100%_0%,100%_0%,0%_0%)]"
                        )}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center text-white">
                            <Logo variant="light" />
                            <Button
                                onClick={() => setIsMenuOpen(false)}
                                variant="ghost"
                                className="p-0 hover:text-white text-sm font-semibold"
                            >
                                {t("menu.close")}
                            </Button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex flex-col gap-1">
                            {NAV_LINKS.map((link, idx) => (
                                <SlidingText key={idx}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "block text-5xl lg:text-7xl font-medium tracking-tighter",
                                            "transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
                                            isMenuOpen
                                                ? "translate-y-0"
                                                : "translate-y-full"
                                        )}
                                        style={{
                                            transitionDelay: isMenuOpen
                                                ? `${300 + idx * 50}ms`
                                                : `${(NAV_LINKS.length - idx) * 30}ms`
                                        }}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {t(`nav.${link.name.toLowerCase().replace(/ /g, '_')}` as any) || link.name}
                                    </Link>
                                </SlidingText>
                            ))}
                        </nav>

                        <div className="flex flex-col gap-10">
                            <SlidingText>
                                <Link
                                    href="/"
                                    className={cn(
                                        "block text-sm",
                                        "transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
                                        isMenuOpen ? "translate-y-0" : "translate-y-full"
                                    )}
                                    style={{
                                        transitionDelay: isMenuOpen
                                            ? `${300 + NAV_LINKS.length * 50 + 50}ms`
                                            : "0ms"
                                    }}
                                >
                                    {t("menu.instagram")}
                                </Link>
                            </SlidingText>

                            <div className="flex flex-col gap-1 text-sm">
                                <SlidingText>
                                    <Link
                                        href="/"
                                        className={cn(
                                            "block",
                                            "transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
                                            isMenuOpen ? "translate-y-0" : "translate-y-full"
                                        )}
                                        style={{
                                            transitionDelay: isMenuOpen
                                                ? `${300 + NAV_LINKS.length * 50 + 100}ms`
                                                : "0ms"
                                        }}
                                    >
                                        {t("menu.privacy")}
                                    </Link>
                                </SlidingText>
                                <SlidingText>
                                    <Link
                                        href="/"
                                        className={cn(
                                            "block",
                                            "transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]",
                                            isMenuOpen ? "translate-y-0" : "translate-y-full"
                                        )}
                                        style={{
                                            transitionDelay: isMenuOpen
                                                ? `${300 + NAV_LINKS.length * 50 + 150}ms`
                                                : "0ms"
                                        }}
                                    >
                                        {t("menu.terms")}
                                    </Link>
                                </SlidingText>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}

export { MobileMenu };
