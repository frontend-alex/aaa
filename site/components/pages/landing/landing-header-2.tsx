"use client";

import { gsap } from "gsap";
import { Button } from "@/custom/button";
import { Navbar } from "@/components/Navbar";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { Link } from "next-transition-router";

gsap.registerPlugin(ScrollTrigger);

function LandingHeaderTwo() {

    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const navbarRef = useRef<HTMLDivElement>(null);
    const projectInfoRef = useRef<HTMLDivElement>(null);
    const bgImageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !headerRef.current || !overlayRef.current || !bgImageRef.current || !navbarRef.current || !projectInfoRef.current) return;

        // --- Initial state: everything hidden ---
        gsap.set([navbarRef.current, projectInfoRef.current], { opacity: 0, y: 30 });
        gsap.set(bgImageRef.current, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        });

        // --- Intro timeline ---
        const tl = gsap.timeline({ delay: 0.5 });

        // 1. Background image reveals with clip-path wipe top → bottom
        tl.to(bgImageRef.current, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.8,
            ease: "power4.inOut",
        });

        // 2. Navbar and project info fade + slide up (after a pause)
        tl.to([navbarRef.current, projectInfoRef.current], {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
        }, "+=1.2");

        // --- Scroll-driven overlay darkening ---
        const overlayTrigger = ScrollTrigger.create({
            trigger: headerRef.current,
            start: "30% top",
            end: "bottom top",
            scrub: true,
            animation: gsap.to(overlayRef.current, {
                opacity: 0.6,
            }),
        });

        return () => {
            tl.kill();
            overlayTrigger.kill();
        };
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="h-screen bg-white">
            <div className="flex flex-col justify-between h-1/3">
                <div ref={navbarRef}>
                    <Navbar />
                </div>

                <div
                    ref={projectInfoRef}
                    className="flex items-center justify-between uppercase text-sm font-semibold px-5"
                >
                    <p>summer villa</p>
                    <p>2021</p>
                    <p className="hidden lg:block">featured project</p>

                    <Link href="/works/summer-vila-r1">
                        <Button
                            circle
                            variant={"ghost"}
                        >
                            View project
                        </Button>
                    </Link>
                </div>
            </div>
            <header
                ref={headerRef}
                className="h-2/3 relative bg-white">
                <div
                    ref={bgImageRef}
                    className="h-full bg-[url('/images/header/bg.png')] bg-cover bg-white bg-bottom"
                    style={{ willChange: "clip-path" }}
                />
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-black"
                    style={{ opacity: 0, zIndex: 2 }}
                />
            </header>
        </div>
    )
}

export { LandingHeaderTwo }
