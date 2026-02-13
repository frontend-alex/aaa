"use client";

import Image from "next/image";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils"
import { Button } from "@/custom/button";
import { NAV_LINKS } from "@/constants/data"
import { SlidingText } from "@/custom/sliding-text";
import { MobileMenu } from "./MobileMenu";
import { RevealWrapper } from "@/custom/stagger-text";
import { Link } from "next-transition-router";

gsap.registerPlugin(ScrollTrigger);

function Logo({ className, landing }: { className?: string, landing?: boolean }) {
    return (
        <Link href="/" className={cn("text-2xl lg:text-5xl font-semibold tracking-tighter block overflow-hidden", className)}>
            <Image src={landing ? "/svgs/logo-w.svg" : "/svgs/logo.svg"} className="reveal-text" alt="Logo" width={50} height={50} />
        </Link>
    )
}

function Navbar({ className, landing }: { className?: string, landing?: boolean }) {
    const stickyButtonsRef = useRef<HTMLDivElement>(null);
    const lastLink = NAV_LINKS[NAV_LINKS.length - 1];

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
                if (self.scroll() > window.innerHeight) {
                    gsap.to(stickyButtonsRef.current, {
                        y: 0,
                        opacity: 1,
                        pointerEvents: "all",
                        duration: 0.5,
                        ease: "power3.out",
                        overwrite: true,
                    });
                } else {
                    gsap.to(stickyButtonsRef.current, {
                        y: 100,
                        opacity: 0,
                        pointerEvents: "none",
                        duration: 0.4,
                        ease: "power3.in",
                        overwrite: true,
                    });
                }
            },
        });

        return () => {
            trigger.kill();
        };
    }, []);

    return (
        <>
            <div className={cn("flex flex-row justify-between items-center bg-transparent", className)}>
                <Logo landing={landing} />

                <ul className="hidden lg:flex flex-row gap-1">
                    {NAV_LINKS.map((link, idx) => (
                        <li key={idx}>
                            {landing ? (
                                <RevealWrapper tag="span" className="inline-block">
                                    <Link className="uppercase text-xs font-bold flex items-center" href={link.href}>
                                        <SlidingText>{link.name}</SlidingText>
                                        {link.name !== lastLink.name ? "," : ""}
                                    </Link>
                                </RevealWrapper>
                            ) : (
                                <Link className="uppercase text-xs font-bold flex items-center" href={link.href}>
                                    <SlidingText>{link.name}</SlidingText>
                                    {link.name !== lastLink.name ? "," : ""}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-3">
                    {landing ? (
                        <RevealWrapper className="hidden lg:inline-block">
                            <Button className="hidden lg:flex">Get in touch</Button>
                        </RevealWrapper>
                    ) : (
                        <Button className="hidden lg:flex">Get in touch</Button>
                    )}
                    <div className="lg:hidden">
                        <MobileMenu variant={"ghost"} buttonClassname="hover:text-white p-0 hover:bg-transparent" />
                    </div>
                </div>
            </div >

            <div
                ref={stickyButtonsRef}
                className="fixed top-5 right-5 z-40 flex items-center gap-3 pointer-events-none opacity-0"
            >
                <Button>
                    Get in touch
                </Button>
                <MobileMenu />
            </div>
        </>
    )
}

export { Navbar, Logo }
