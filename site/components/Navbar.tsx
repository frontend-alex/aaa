"use client";

import Image from "next/image";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils"
import { Button } from "@/custom/button";

import { NAV_LINKS } from "@/constants/data"

import { MobileMenu } from "./MobileMenu";
import { ContactSheet } from "@/components/ContactSheet";

import { Link } from "@/components/custom/link";
import { SlidingText } from "./custom/text/sliding-text";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslate } from "@/hooks/useTranslate";

gsap.registerPlugin(ScrollTrigger);

function Logo({
    className,
    variant = "default",
}: {
    className?: string;
    variant?: "default" | "light";
}) {
    return (
        <Link
            href="/"
            className={cn(
                "text-2xl lg:text-5xl font-semibold tracking-tighter block overflow-hidden",
                className
            )}
        >
            <Image
                src={variant === "light" ? "/svgs/logo-w.svg" : "/svgs/logo.svg"}
                alt="Logo"
                width={50}
                height={50}
            />
        </Link>
    );
}

// --------- Navbar Component ---------
function Navbar({
    className,
    linkWrapper,
    actionWrapper,
    logoVariant = "default",
}: {
    className?: string;
    linkWrapper?: (node: React.ReactNode) => React.ReactNode;
    actionWrapper?: (node: React.ReactNode) => React.ReactNode;
    logoVariant?: "default" | "light";
}) {
    const stickyButtonsRef = useRef<HTMLDivElement>(null);
    const lastLink = NAV_LINKS[NAV_LINKS.length - 1];
    const { t } = useTranslate();

    // Sticky animation
    useEffect(() => {
        if (!stickyButtonsRef.current) return;

        gsap.set(stickyButtonsRef.current, {
            y: 100,
            opacity: 0,
            pointerEvents: "none",
        });

        const trigger = ScrollTrigger.create({
            start: "top -100vh",
            end: "max",
            onUpdate: (self) => {
                const visible = self.scroll() > window.innerHeight;
                gsap.to(stickyButtonsRef.current, {
                    y: visible ? 0 : 100,
                    opacity: visible ? 1 : 0,
                    pointerEvents: visible ? "all" : "none",
                    duration: visible ? 0.5 : 0.4,
                    ease: visible ? "power3.out" : "power3.in",
                    overwrite: true,
                });
            },
        });

        return () => trigger.kill();
    }, []);

    return (
        <>
            <div className={cn("flex justify-between items-center p-5", className)}>
                <Logo variant={logoVariant} />

                <ul className="hidden lg:flex gap-2">
                    {NAV_LINKS.map((link, idx) => {
                        const content = (
                            <Link
                                className="uppercase text-sm font-bold flex items-center"
                                href={link.href}
                            >
                                <SlidingText>{t(`nav.${link.name.toLowerCase().replace(/ /g, '_')}` as any) || link.name}</SlidingText>
                                {/* {link.name !== lastLink.name ? "," : ""} */}
                            </Link>
                        );
                        return <li key={idx}>{linkWrapper ? linkWrapper(content) : content}</li>;
                    })}
                </ul>

                <div className="flex items-center gap-3">
                    {actionWrapper ? (
                        actionWrapper(
                            <ContactSheet>
                                <Button className="hidden lg:flex">{t("nav.get_in_touch")}</Button>
                            </ContactSheet>
                        )
                    ) : (
                        <ContactSheet>
                            <Button className="hidden lg:flex">{t("nav.get_in_touch")}</Button>
                        </ContactSheet>
                    )}


                    <div className="lg:hidden">
                        <MobileMenu />
                    </div>
                    <LanguageSwitcher />
                </div>
            </div>

            {/* Sticky buttons */}
            <div
                ref={stickyButtonsRef}
                className="fixed top-5 right-5 z-40 flex items-center gap-3 pointer-events-none opacity-0"
            >
                <ContactSheet>
                    <Button>{t("nav.get_in_touch")}</Button>
                </ContactSheet>
                <MobileMenu />
            </div>
        </>
    );
}

export { Navbar, Logo }